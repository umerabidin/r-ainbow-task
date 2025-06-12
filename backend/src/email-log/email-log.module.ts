import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmailLog, EmailLogSchema } from "./email-log.schema";
import { EmailLogService } from "./email-log.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailLog.name, schema: EmailLogSchema },
    ]),
  ],
  providers: [EmailLogService],
  exports: [EmailLogService],
})
export class EmailLogModule {}
