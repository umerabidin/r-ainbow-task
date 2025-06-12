import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { UserService } from "../users/user.service";
import { ProductService } from "../products/product.service";
import { NotificationService } from "../notifications/notification.service";
import { v4 as uuidv4 } from "uuid";
import { DiscountService } from "src/discount/discount.service";
import dayjs from "dayjs";
import mongoose, { Types } from "mongoose";
import { generateDiscountEmail } from "src/utils/helper";
import { EmailLogService } from "src/email-log/email-log.service";

@Injectable()
export class CampaignService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly notificationService: NotificationService,
    private readonly discountService: DiscountService,
    private readonly emailLogService: EmailLogService
  ) {}

  @Cron("* * * * *") // Runs every minute
  async runDailyBirthdayCampaign() {
    try {
      if (process.env.CRON_DISABLED === "true") return;
      console.log("crown is running");
      
      const today = dayjs();

      const users = await this.userService.findUsersWithUpcomingBirthdays();

      if (users.length === 0) {
        console.log("no user");
        return;
      }

      for (const user of users) {
        const existingDiscount = await this.discountService.findOne({
          user: new Types.ObjectId(String(user._id)),
          sentAt: {
            $gte: today.startOf("year").toDate(),
            $lte: today.endOf("year").toDate(),
          },
        });

        if (existingDiscount) continue;

        const discountCode = uuidv4().replace(/-/g, "").slice(0, 6);
        const tagIds = user.preferences.map((pref: any) =>
          typeof pref === "string" ? pref : pref._id.toString()
        );

        const suggestedProducts = await this.productService.getSuggestions(
          tagIds
        );

        await this.discountService.create({
          discountName: "birthdayVoucher",
          userId: String(user._id),
          code: discountCode,
          expiresAt: dayjs().add(7, "days").toDate(),
          sentAt: new Date(),
        });

        const emailBody = generateDiscountEmail({
          user,
          discountCode,
          suggestedProducts,
        });

        await this.notificationService.sendEmail(
          user.email,
          "Your Birthday Discount & Gift Picks 🎁",
          emailBody
        );

        await this.emailLogService.create({
          userId: String(user._id),
          body: emailBody,
          type: "BIRTHDAY_DISCOUNT",
          sentAt: new Date(),
        });
      }
    } catch (error) {
      console.error("Error running birthday campaign:", error);
      throw new InternalServerErrorException(
        "Failed to execute birthday campaign"
      );
    }
  }

  async previewCampaign(userId: string) {
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) return { message: "User not found" };

      const discountCode = uuidv4();
      const tagIds = user.preferences.map((pref: any) => pref._id);

      const suggestedProducts = await this.productService.getSuggestions(
        tagIds
      );

      return {
        user: {
          name: user.name,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
        },
        discountCode,
        suggestedProducts,
      };
    } catch (error) {
      console.error("Error generating campaign preview:", error);
      throw new InternalServerErrorException(
        "Failed to preview birthday campaign"
      );
    }
  }
}
