import { IsString, IsNumber, IsArray } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsArray()
  tags: string[];
}
