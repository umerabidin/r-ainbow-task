import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Discount extends Document {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  user: Types.ObjectId;

  @Prop({ default: false })
  used: boolean;

  @Prop({ required: true })
  discountName: string;

  @Prop({ type: Date })
  expiresAt: Date;

  @Prop({ type: Number, default: 15 }) // <-- Add this line
  discountPercentage: number;

  @Prop()
  sentAt: Date;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
