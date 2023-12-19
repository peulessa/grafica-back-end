import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/plugins/prisma.service';
import { BuscaUsuarioFilterDto } from './dto/busca-usuario.dto';

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

  async findAllAdm(filterDto?: BuscaUsuarioFilterDto): Promise<any> {
    const { pesquisa, pagina } = filterDto;
    const take = 10;
    const skip = (Number(pagina) - 1) * take;
    let items;

    try {
      if (pesquisa || pesquisa != null) {
        const totalItems = await this.prisma.usuario.count({
          where: {
            nome: {
              contains: pesquisa,
              mode: 'insensitive',
            },
          },
        });
        items = await this.prisma.usuario.findMany({
          where: {
            nome: {
              contains: pesquisa,
              mode: 'insensitive',
            },
          },
          orderBy: { nome: 'asc' },
          skip,
          take,
        });

        return await this.paginate(items, take, pagina, totalItems);
      } else {
        const totalItems = await this.prisma.usuario.count({});
        const items = await this.prisma.usuario.findMany({
          orderBy: { nome: 'asc' },
          skip,
          take,
        });
        return await this.paginate(items, take, pagina, totalItems);
      }
    } catch (error) {
      this.logger.error('erro: ' + error.message, {
        logId: 'service.usuario.service.busca.todos.adm',
      });

      throw error.message;
    }
  }

  async findOneId(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuario) {
      this.logger.error('erro: Usuario não existe', {
        logId: 'service.usuario.service.busca.id',
      });

      throw new NotFoundException('Usuario não encontrado');
    }

    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const data = updateUsuarioDto;
    const usuarioExists = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuarioExists) {
      this.logger.error('erro: Usuario não existe', {
        logId: 'service.usuario.service.atualiza',
      });

      throw new NotFoundException('Usuario não existe');
    }

    if (data.senha) {
      data.senha = await this.hashSenha(data.senha);
    }

    await this.prisma.usuario.update({
      data,
      where: {
        id,
      },
    });

    return { message: 'Usuario atualizado com sucesso' };
  }

  async remove(id: string) {
    const usuarioExists = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuarioExists) {
      this.logger.error('erro: Usuario não existe', {
        logId: 'service.usuario.service.remove',
      });

      throw new NotFoundException('Usuario não existe');
    }

    await this.prisma.usuario.delete({
      where: {
        id,
      },
    });

    return { message: 'Usuario removido com sucesso' };
  }

  async hashSenha(rawSenha: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawSenha, SALT);
  }

  private async paginate(items, take, pagina, totalItems) {
    const totalPages =
      totalItems % take > 0
        ? Math.trunc(totalItems / take + 1)
        : Math.trunc(totalItems / take);

    const currentPage = pagina;
    const itemsPerPage = take;
    const itemCount = items.length;
    const meta = {
      currentPage,
      itemCount,
      itemsPerPage,
      totalItems,
      totalPages,
    };

    return { items, meta };
  }
}
