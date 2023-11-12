import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ErrorHandlingMiddleware } from './middleware/errorHandlingMiddleware.middleware';
// import { GlobalExceptionFilter } from './middleware/globalExceptionFilter.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalFilters(new ErrorHandlingMiddleware());

  app.useLogger(false);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    // .addTag('api')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
