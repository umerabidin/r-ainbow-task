import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EmailLog } from "./email-log.schema";
import { Model, Types } from "mongoose";
import { CreateEmailLogDto } from "./dto/create-email.dto";

@Injectable()
export class EmailLogService {
  constructor(
    @InjectModel(EmailLog.name)
    private readonly emailLogModel: Model<EmailLog>
  ) {}

  async create(logData: CreateEmailLogDto) {
    const log = new this.emailLogModel({
      ...logData,
      userId: new Types.ObjectId(logData.userId),
    });
    return await log.save();
  }

  async findByUserAndType(userId: string, type: string) {
    return this.emailLogModel.findOne({ userId, type }).exec();
  }

  async getAllLogs() {
    return this.emailLogModel.find().populate("userId", "name email").exec();
  }
}
