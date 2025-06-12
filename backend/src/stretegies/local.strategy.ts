import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    if (user?.message) {
      throw new UnauthorizedException({
        message: user?.message,
        title: "Authentication Failed",
        isSuccessfull: false,
      });
    }

    delete user.password;

    return user;
  }
}
