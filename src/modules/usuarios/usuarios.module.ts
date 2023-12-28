import { Module, Logger } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { DatabaseModule } from 'src/plugins/database.module';

@Module({
  exports: [UsuariosService],
  imports: [DatabaseModule],
  controllers: [UsuariosController],
  providers: [UsuariosService, Logger],
})
export class UsuariosModule {}
