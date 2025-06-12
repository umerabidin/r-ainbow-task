import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class EmailLog extends Document {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop()
  subject: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  type: string; // e.g., 'BIRTHDAY_DISCOUNT'

  @Prop({ default: Date.now })
  sentAt: Date;
}

export const EmailLogSchema = SchemaFactory.createForClass(EmailLog);
