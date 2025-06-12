import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { TagsModule } from "./tags/tags.module";
import { NotificationModule } from "./notifications/notification.module";
import { CampaignModule } from "./campaigns/campaign.module";
import { DiscountModule } from "./discount/discount.module";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URI || "mongodb://localhost:27017/birthday-campaign"
    ),
    NotificationModule,
    AuthModule,
    DiscountModule,
    OrderModule,
    CampaignModule,
    TagsModule,
    UsersModule,
  ],
})
export class AppModule {}
