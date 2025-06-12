// src/discounts/discount.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
} from "@nestjs/common";
import { DiscountService } from "./discount.service";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { ValidateDiscountDto } from "./dto/create-discount.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { Request as ExpressRequest } from "express";
import { UserPayload } from "src/types/user.interface";

interface DiscountRequest extends ExpressRequest {
  user: UserPayload;
}

@Controller("discounts")
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post("create")
  create(@Body() dto: CreateDiscountDto) {
    return this.discountService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":name")
  getUserDiscount(
    @Param("name") name: string,
    @Request() req: DiscountRequest
  ) {
    return this.discountService.getUserDiscount(req.user, name);
  }

  @UseGuards(JwtAuthGuard)
  @Post("validate")
  validateAndApply(@Request() req: DiscountRequest) {
    return this.discountService.validateAndApply(req.user, req.body);
  }
}
