import { Module, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/plugins/database.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  exports: [UserService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [UserService, Logger],
})
export class UserModule {}
