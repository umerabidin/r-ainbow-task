import { IsMongoId, IsString, IsEnum, IsDate } from "class-validator";

export class CreateEmailLogDto {
  @IsMongoId()
  userId: string;

  @IsString()
  body: string;

  @IsString()
  type: string;

  @IsDate()
  sentAt: Date;
}
