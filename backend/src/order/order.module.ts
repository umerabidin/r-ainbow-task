import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./order.schema";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { Discount, DiscountSchema } from "../discount/discount.schema";
import { Product, ProductSchema } from "../products/product.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Discount.name, schema: DiscountSchema },
      { name: Product.name, schema: ProductSchema }, // 👈 Register again
    ]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
