import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o nome do usuário',
  })
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o nível do Usuário',
  })
  @IsString()
  nivel: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Login',
  })
  @IsString()
  login: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a Senha',
  })
  @IsString()
  senha: string;
}
