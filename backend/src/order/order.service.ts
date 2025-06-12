import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./order.schema";
import { Model } from "mongoose";
import { UserPayload } from "src/types/user.interface";
import { Product } from "../products/product.schema";
import { Discount } from "src/discount/discount.schema";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Discount.name) private readonly discountModel: Model<Discount>
  ) {}

  async create(orderData: Partial<Order>, user: UserPayload) {
    try {
      const { _id } = user;
      const { discountCode } = orderData;

      const session = await this.orderModel.db.startSession();
      session.startTransaction();

      if (discountCode) {
        const discount = await this.discountModel.findOne({
          code: discountCode,
          user: user._id,
          used: false,
        });

        if (discount) {
          discount.used = true;
          await discount.save();
        }
      }

      const updatedProducts: any[] = [];

      for (const item of orderData.products || []) {
        const product = await this.productModel
          .findById(item.productId)
          .session(session);

        if (!product) {
          throw new HttpException(
            {
              message: `Product with ID ${item.productId} not found.`,
              isSuccessfull: false,
            },
            HttpStatus.BAD_REQUEST
          );
        }

        if (item.quantity > product.quantity) {
          throw new HttpException(
            {
              message: `Only ${product.quantity} items available for ${product.name}.`,
              isSuccessfull: false,
            },
            HttpStatus.BAD_REQUEST
          );
        }

        // Subtract ordered quantity
        product.quantity -= item.quantity;
        await product.save({ session });

        updatedProducts.push({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
          discountAmount: item.discountAmount,
        });
      }

      const newOrder = new this.orderModel({
        ...orderData,
        products: updatedProducts,
        status: "PENDING",
        userId: _id,
      });

      await newOrder.save({ session });
      await session.commitTransaction();
      session.endSession();

      return {
        message: "Order Saved Successfully",
        order: newOrder,
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

  async findAllByUser(userId: string) {
    return this.orderModel.find({ userId }).populate("products").exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).populate("products").exec();
  }
}
