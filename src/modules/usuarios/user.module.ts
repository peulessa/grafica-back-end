import { Module, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/plugins/database.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  exports: [UserService],
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, Logger],
})
export class UserModule {}
