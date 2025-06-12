import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { UserPayload } from "src/types/user.interface";
import { Request as ExpressRequest } from "express";

interface ProductRequest extends ExpressRequest {
  user: UserPayload;
}
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProducts() {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("recommend")
  async getRecommended(@Request() req: ProductRequest) {
    return this.productService.getRecommendedProduct(req.user);
  }
}
