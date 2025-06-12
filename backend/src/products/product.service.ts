import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./product.schema";
import { CreateProductDto } from "./dto/create-product.dto";
import { UserPayload } from "src/types/user.interface";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return this.productModel.create(dto);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getSuggestions(tagIds: string[]): Promise<Product[]> {
    return this.productModel
      .find({ tags: { $in: tagIds } })
      .limit(3)
      .lean()
      .sort({ _id: 1 })
      .exec();
  }

  async getRecommendedProduct(
    user: UserPayload
  ): Promise<{ message: string; products: Product[] }> {
    try {
      const tagIds = user.preferences.map((pref: any) =>
        typeof pref === "string" ? pref : pref._id.toString()
      );

      let allProducts = await this.productModel
        .find({ tags: { $in: tagIds } })
        .populate("tags", "name displayName")
        .lean()
        .exec();

      return {
        message: "All Recommended Products",
        products: allProducts,
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
