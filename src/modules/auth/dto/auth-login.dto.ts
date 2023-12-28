import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { CreateUsuarioDto } from 'src/modules/usuarios/dto/create-usuario.dto';

export class AuthLoginDto extends PartialType(CreateUsuarioDto) {}
