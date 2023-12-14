import { IsEmail, IsJWT, IsString, MinLength } from 'class-validator';

export class AuthForgetDto {
  @IsString()
  @MinLength(8)
  password: string;

  @IsJWT()
  token: string;
}
