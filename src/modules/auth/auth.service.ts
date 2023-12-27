import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { PrismaService } from 'src/plugins/prisma.service';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { User } from '@prisma/client';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserService } from '../usuarios/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      {
        expiresIn: '1d',
        subject: user.id.toString(),
        issuer: 'Login',
        audience: 'users',
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
        password: data.password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou Senha Incorretos');
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
      throw new UnauthorizedException('Email Não Encontrado');
    }

    //TO DO: ENVIAR EMAIL COM TOKEN

    return true;
  }

  async reset(data: AuthResetDto) {
    //TO DO: VALIDAR TOKEN

    const id = '0';

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: data.password,
      },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
