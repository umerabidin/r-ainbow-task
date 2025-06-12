import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true }) name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: Date }) dateOfBirth: Date;

  @Prop() birthMonth: number; // 1-12
  @Prop() birthDay: number; // 1-31
  @Prop() birthYear: number; // 1-31

  @Prop({ type: [{ type: Types.ObjectId, ref: "Tag" }], default: [] })
  preferences: Types.ObjectId[];

  @Prop({ default: "guest" })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
