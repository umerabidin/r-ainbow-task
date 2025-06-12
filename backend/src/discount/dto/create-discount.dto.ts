import {
  IsMongoId,
  IsOptional,
  IsString,
  IsDate,
  IsNumber,
} from "class-validator";

export class CreateDiscountDto {
  @IsMongoId()
  userId: string;

  @IsString()
  code: string;

  @IsString()
  discountName: string;

  @IsOptional()
  @IsDate()
  expiresAt?: Date;

  @IsOptional()
  @IsDate()
  sentAt?: Date;

  @IsOptional()
  @IsNumber()
  discountPercentage?: number;
}

export class ValidateDiscountDto {
  code: string;
}
