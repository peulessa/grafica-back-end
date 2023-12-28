import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PrismaService } from 'src/plugins/prisma.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }

  @Post('reset')
  async reset(@Body() body: AuthResetDto) {
    return this.authService.reset(body);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.usuarioService.create(body);
  }

  @Post('forget')
  async forget(@Body() body: AuthForgetDto) {
    return this.authService.forget(body);
  }
}
