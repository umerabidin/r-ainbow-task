import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Module({
  providers: [NotificationService],
  exports: [NotificationService], // make available to CampaignService
})
export class NotificationModule {}
