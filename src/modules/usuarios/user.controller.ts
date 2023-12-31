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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { User } from '@prisma/client';

@Controller('usuarios')
export class UserController {
  constructor(private readonly usuariosService: UserService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUserDto): Promise<any> {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usuariosService.findOneId(id);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usuariosService.findAll();
  }

  @Get('admin')
  async findAllAdm(@Query() filterDto?: FindUserDto): Promise<User[] | any> {
    return this.usuariosService.findAllAdm(filterDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUserDto,
  ) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
