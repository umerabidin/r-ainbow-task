import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop([
    {
      productId: { type: Types.ObjectId, ref: "Product", required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      discountAmount: { type: Number, default: 0 },
    },
  ])
  products: {
    productId: Types.ObjectId;
    price: number;
    quantity: number;
    discountAmount?: number;
  }[];

  @Prop({ default: "COD", enum: ["COD", "ONLINE"] })
  paymentMethod: string;

  @Prop({ default: "PENDING", enum: ["PENDING", "CONFIRMED", "DELIVERED"] })
  status: string;

  @Prop()
  totalAmount: number;

  @Prop()
  discountCode?: string;

  @Prop()
  discountAmount?: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
