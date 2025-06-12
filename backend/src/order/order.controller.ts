import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Request,
  UseGuards,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Request() req: any) {
    return this.orderService.create(req.body, req.user);
  }

  @Get()
  async getMyOrders(@Request() req: any) {
    return this.orderService.findAllByUser(req.user._id);
  }

  @Get(":id")
  async getOrderDetails(@Param("id") id: string) {
    return this.orderService.findOne(id);
  }
}
