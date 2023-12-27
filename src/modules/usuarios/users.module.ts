import { Module, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/plugins/database.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  exports: [UsersService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger],
})
export class UsersModule {}
