import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import dayjs from "dayjs";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.userModel.create(dto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async findUsersWithUpcomingBirthdays(): Promise<User[]> {
    try {
      const today = dayjs();
      const upcoming = today.add(7, "day");

      const users = await this.userModel
        .find({
          birthMonth: {
            $gte: today.month() + 1,
            $lte: upcoming.month() + 1,
          },
          birthDay: { $gte: today.date(), $lte: upcoming.date() },
        })
        .populate("preferences", "name displayName")
        .sort({ _id: 1 })
        .lean()
        .exec();

      return users;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Could not fetch users.");
    }
  }
}
