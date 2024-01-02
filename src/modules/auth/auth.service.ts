import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { PrismaService } from 'src/plugins/prisma.service';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { User } from '@prisma/client';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UsuariosService,
  ) {}

  async createToken(user: User) {
    return this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        nome: user.nome,
      },
      {
        expiresIn: '1d',
        subject: user.id,
        issuer: 'Login',
        audience: 'Users',
      },
    );
  }

  async checkToken() {
    //return this.jwtService.verify();
  }

  async login(data: AuthLoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
        senha: data.senha,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return this.createToken(user);
  }

  async forget(data: AuthForgetDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email inválido');
    }

    return true;
  }

  async reset(data: AuthResetDto) {
    //TO DO: Validar o Token

    const id = '0';

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        senha: data.senha,
      },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
