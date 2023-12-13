import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'Ge.ap~7ZbF`,i~ljmxD&%*#4}P`ba$z7',
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule {}
