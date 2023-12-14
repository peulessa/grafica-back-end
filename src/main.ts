import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get<string>('APP_NAME'))
    .setDescription(config.get<string>('APP_NAME'))
    .setVersion(config.get<string>('APP_VERSION'))
    .addTag('Módulos')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const HTTP_PORT = config.get<string>('HTTP_PORT');

  const APP_HOSTNAME = config.get<string>('APP_HOSTNAME');

  await app.listen(HTTP_PORT, () => {
    const address = 'http://' + APP_HOSTNAME + ':' + HTTP_PORT + '/';
    Logger.debug('Listening at ' + address);
  });
}
bootstrap();
