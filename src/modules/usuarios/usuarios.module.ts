import { Module, Logger } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { DatabaseModule } from 'src/plugins/database.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  exports: [UsuariosService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, Logger],
})
export class UsuariosModule {}
