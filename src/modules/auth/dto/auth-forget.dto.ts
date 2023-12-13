import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthForgetDto {
  @IsEmail()
  email: string;
}
