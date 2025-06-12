import { Module } from "@nestjs/common";
import { CampaignController } from "./campaign.controller";
import { CampaignService } from "./campaign.service";
import { UsersModule } from "../users/user.module";
import { ProductsModule } from "../products/product.module";
import { NotificationModule } from "../notifications/notification.module";
import { DiscountModule } from "../discount/discount.module";
import { EmailLogModule } from "src/email-log/email-log.module";
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    NotificationModule,
    DiscountModule,
    EmailLogModule,
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
