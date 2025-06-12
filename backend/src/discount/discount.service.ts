// src/discounts/discount.service.ts
import {
  Injectable,
  HttpException,
  BadRequestException,
  HttpStatus,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Discount } from "./discount.schema";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { ValidateDiscountDto } from "./dto/create-discount.dto";
import { UserPayload } from "src/types/user.interface";

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<Discount>
  ) {}

  async create(dto: CreateDiscountDto) {
    return this.discountModel.create({
      ...dto,
      user: new Types.ObjectId(dto.userId),
    });
  }

  async findOne(filter: Record<string, any>) {
    return this.discountModel.findOne(filter).lean().exec();
  }

  async getUserDiscount(user: UserPayload, name: string) {
    try {
      if (!name)
        throw new HttpException(
          {
            message: "Discount Name is required.",
            isSuccessfull: false,
          },
          HttpStatus.BAD_REQUEST
        );

      const discount = await this.discountModel
        .findOne({ discountName: name, user: user._id })
        .select("code discountPercentage expiresAt discountName");

      return { message: "Discount Sent Successfully", discount: discount };
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

  async validateAndApply(user: UserPayload, dto: ValidateDiscountDto) {
    try {
      const discount = await this.discountModel.findOne({
        code: dto.code,
        user: user._id,
        used: false,
      });

      if (!discount)
        throw new HttpException(
          {
            message: "Invalid or expired discount code",
            isSuccessfull: false,
          },
          HttpStatus.BAD_REQUEST
        );
      if (discount.expiresAt && new Date() > discount.expiresAt) {
        throw new HttpException(
          {
            message: "Discount code has expired",
            isSuccessfull: false,
          },
          HttpStatus.BAD_REQUEST
        );
      }

      return {
        message: "Discount is valid",
        discountPercentage: discount.discountPercentage,
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
}
