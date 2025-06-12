import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./product.schema";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductsModule {}
