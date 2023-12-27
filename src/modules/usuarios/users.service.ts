import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/plugins/prisma.service';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(data: CreateUserDto) {
    data.password = await this.hashSenha(data.password);

    const usuarioExists = await this.prisma.user.findFirst({
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

    const emailExists = await this.prisma.user.findFirst({
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

    const usuario = this.prisma.user.create({
      data,
    });

    return usuario;
  }

  async findAllAdm(filterDto?: FindUserDto): Promise<any> {
    const { pesquisa, pagina } = filterDto;
    const take = 10;
    const skip = (Number(pagina) - 1) * take;
    let items;

    try {
      if (pesquisa || pesquisa != null) {
        const totalItems = await this.prisma.user.count({
          where: {
            name: {
              contains: pesquisa,
              mode: 'insensitive',
            },
          },
        });
        items = await this.prisma.user.findMany({
          where: {
            name: {
              contains: pesquisa,
              mode: 'insensitive',
            },
          },
          orderBy: { name: 'asc' },
          skip,
          take,
        });

        return await this.paginate(items, take, pagina, totalItems);
      } else {
        const totalItems = await this.prisma.user.count({});
        const items = await this.prisma.user.findMany({
          orderBy: { name: 'asc' },
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
    const usuario = await this.prisma.user.findUnique({
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

  async update(id: string, updateUsuarioDto: UpdateUserDto) {
    const data = updateUsuarioDto;
    const usuarioExists = await this.prisma.user.findUnique({
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

    if (data.password) {
      data.password = await this.hashSenha(data.password);
    }

    await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });

    return { message: 'Usuario atualizado com sucesso' };
  }

  async remove(id: string) {
    const usuarioExists = await this.prisma.user.findUnique({
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

    await this.prisma.user.delete({
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
