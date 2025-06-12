import { Controller, Get, Param } from "@nestjs/common";
import { CampaignService } from "./campaign.service";

@Controller("campaign")
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get("preview/:userId")
  async getPreview(@Param("userId") userId: string) {
    return this.campaignService.previewCampaign(userId);
  }
}
