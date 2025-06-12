import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { User } from "../users/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UserPayload } from "src/types/user.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      return { message: "There is no user related to this email." };
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) return user;

    return { message: "Invalid Password." };
  }

  async register(dto: RegisterDto) {
    try {
      const existing = await this.userModel.findOne({ email: dto.email });
      if (existing) {
        throw new HttpException(
          {
            message: "Email already registered",
            isSuccessfull: false,
          },
          HttpStatus.BAD_REQUEST
        );
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user: any = await this.userModel.create({
        ...dto,
        password: hashedPassword,
        dateOfBirth: new Date(dto.dateOfBirth),
        birthMonth: new Date(dto.dateOfBirth).getMonth() + 1,
        birthDay: new Date(dto.dateOfBirth).getDate(),
        birthYear: new Date(dto.dateOfBirth).getFullYear(),
      });

      const token = this.jwtService.sign({ sub: user._id, email: user.email });

      const { password, ...userWithoutPassword } = user.toObject();

      return {
        message: "User Created Successfully",
        user: {
          ...userWithoutPassword,
          dateOfBirth: new Date(userWithoutPassword.dateOfBirth).toISOString().slice(0, 10),
        },
        accessToken: token,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new HttpException(
        {
          message: (error as Error)?.message || "Unexpected error occurred",
          isSuccessfull: false,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async login(user: any) {
    try {
      const token = this.jwtService.sign({ sub: user._id, email: user.email });
      const { password, ...userWithoutPassword } = user.toObject();

      return {
        message: "User login Successfully",
        accessToken: token,

        user: {
          ...userWithoutPassword,
          dateOfBirth: new Date(userWithoutPassword.dateOfBirth).toISOString().slice(0, 10),
        },
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new HttpException(
        {
          message: (error as Error)?.message || "Unexpected error occurred",
          isSuccessfull: false,
        },
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
