import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../usuarios/user.service';
import { DatabaseModule } from 'src/plugins/database.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'L;8Ppb@FSmV8$(j8r!VL6uP;_%&v*jW9',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
