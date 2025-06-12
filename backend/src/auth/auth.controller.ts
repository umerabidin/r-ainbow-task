import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { Request as ExpressRequest } from "express";
import { UserPayload } from "src/types/user.interface";

interface AuthRequest extends ExpressRequest {
  user: UserPayload;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
