import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  rating!: number;

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  quantity!: number;

  @Prop({ type: [Types.ObjectId], ref: "Tag", default: [] })
  tags!: Types.ObjectId[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
