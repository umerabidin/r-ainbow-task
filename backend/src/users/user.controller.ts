import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Get(":id")
  async getUser(@Param("id") id: string) {
    return this.userService.findUserById(id);
  }
}
