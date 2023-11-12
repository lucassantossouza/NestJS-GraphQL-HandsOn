import { Module } from '@nestjs/common';

import { HomeModule } from './modules/home/home.module';
import { UserModule } from './modules/user/user.module';
import { CredentialModule } from './modules/credential/credential.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/dataSource';
import { GlobalExceptionFilter } from './middleware/globalExceptionFilter.middleware';

@Module({
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionFilter,
    },
  ],
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    // import all modules here
    HomeModule,
    UserModule,
    CredentialModule,
  ],
  controllers: [],
})
export class AppModule {}
