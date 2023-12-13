import { Module } from '@nestjs/common';
import * as ConfigEnv from '@nestjs/config';

@Module({
  imports: [
    ConfigEnv.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
