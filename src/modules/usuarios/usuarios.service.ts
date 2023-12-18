import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/plugins/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(data: CreateUsuarioDto) {
    data.senha = await this.hashSenha(data.senha);

    const usuarioExists = await this.prisma.usuario.findFirst({
      where: {
        login: data.login,
      },
    });

    if (usuarioExists) {
      this.logger.error('erro: Usuário já existe', {
        logId: 'service.usuario.service.cria.usuario',
      });

      throw new ConflictException('Usuário já existe');
    }

    const emailExists = await this.prisma.usuario.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailExists) {
      this.logger.error('erro: Email já existe', {
        logId: 'service.usuario.service.cria.usuario',
      });

      throw new ConflictException('Email já existe');
    }

    const usuario = this.prisma.usuario.create({
      data,
    });

    return usuario;
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async hashSenha(rawSenha: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawSenha, SALT);
  }
}
