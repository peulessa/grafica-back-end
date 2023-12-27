import { IsEmail, IsJWT, IsString, MinLength } from 'class-validator';

export class AuthResetDto {
  @IsString()
  @MinLength(8)
  password: string;

  @IsJWT()
  token: string;
}
