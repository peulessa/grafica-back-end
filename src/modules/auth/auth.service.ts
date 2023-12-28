import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { PrismaService } from 'src/plugins/prisma.service';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    //return this.jwtService.sign();
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

    return user;
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

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        senha: data.senha,
      },
    });

    return true;
  }
}
