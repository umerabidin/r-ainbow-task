import {
  IsString,
  IsEmail,
  MinLength,
  IsDateString,
  IsArray,
  IsDate,
} from "class-validator";

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  dateOfBirth: string;

  @IsArray()
  preferences: string[];
}
