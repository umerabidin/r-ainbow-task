import { IsEmail, IsString, IsDateString, IsArray } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dateOfBirth: string;

  @IsArray()
  preferences: string[];
}
