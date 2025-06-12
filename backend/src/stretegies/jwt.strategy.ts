import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../users/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    configService: ConfigService
  ) {
    const secret = configService.get<string>("JWT_SECRET");
    if (!secret) {
      throw new Error("JWT_SECRET not defined in environment variables");
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findUserById(payload.sub);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }

    const { password, ...userWithoutPassword } = user.toObject();

    return {
      userId: user._id,
      email: user.email,
      deviceId: payload.deviceId || null,
      tokenId: payload.tokenId || null,
      ...userWithoutPassword,
    };
  }
}
