import { config as dotenvConfig } from 'dotenv';
if (/prd|prod/.test(process.env.NODE_ENV)) dotenvConfig({ path: '.env.prod' });
else dotenvConfig();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { GlobalFilter } from './modules/global/global.filter';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { DatabaseError } from './modules/database/database';
import { DatabaseMinimalModule } from './modules/database/databaseMinimal.module';
import { dataSourceOptions } from './modules/database/database.module';

// create count interation to test connection
const databaseAttempts: number = parseInt(
  process.env.DATABASE_CONNECTION_ATTEMPTS,
);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkConnection() {
  let isConnection = false;
  for (let attempt = 0; attempt < databaseAttempts; attempt++) {
    try {
      const dataSource = new DataSource(dataSourceOptions);
      await dataSource.initialize();
      Logger.log('Database connection is successful in try');
      isConnection = true;
      if (dataSource.isInitialized) break;
    } catch (error) {
      Logger.error(
        `Unable to connect to the database. Retrying (${attempt + 1})...`,
      );
      DatabaseError.error = error;
      await delay(1000);
    }
  }
  if (!isConnection) {
    Logger.error(`Check your connection to the database and try again. \n
    -- Check your environment variables \n
    -- Check if your database is running \n
    -- Check your database configuration \n
    -- Check your database credentials `);
    Logger.error(
      "Your application will not work without a database, let's start in minimal mode.",
    );
  }
  return isConnection;
}

async function bootstrap() {
  let app;
  if (!(await checkConnection()))
    app = await NestFactory.create(DatabaseMinimalModule);
  else app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalFilter());

  // app.useLogger(false);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    // .addTag('api')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      scheme: 'Bearer',
      bearerFormat: 'token',
      name: 'Authorization',
    } as SecuritySchemeObject)
    .addSecurityRequirements('bearerAuth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
