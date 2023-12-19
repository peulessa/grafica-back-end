import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { BuscaUsuarioFilterDto } from './dto/busca-usuario.dto';
import { Usuario } from '@prisma/client';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<any> {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string): Promise<Usuario> {
    return this.usuariosService.findOneId(id);
  }

  @Get('admin')
  async findAllAdm(
    @Query() filterDto?: BuscaUsuarioFilterDto,
  ): Promise<Usuario[] | any> {
    return this.usuariosService.findAllAdm(filterDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
