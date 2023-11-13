import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
// import { GlobalExceptionFilter } from './middleware/globalExceptionFilter.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(false);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    // .addTag('api')
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        scheme: 'Bearer',
        bearerFormat: 'token',
        name: 'Authorization',
      } as SecuritySchemeObject,
      'Bearer',
    )
    .addSecurityRequirements('bearerAuth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
