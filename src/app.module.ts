import { Module } from '@nestjs/common';

import { HomeModule } from './modules/home/home.module';
import { UserModule } from './modules/user/user.module';
import { CredentialModule } from './modules/credential/credential.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/dataSource';
import { AuthModule } from './modules/auth/auth.module';
// import { GlobalExceptionFilter } from './middleware/globalExceptionFilter.middleware';
// console.log('dataSourceOptions', dataSourceOptions);

@Module({
  providers: [
    // {
    //   provide: 'APP_FILTER',
    //   useClass: GlobalExceptionFilter,
    // },
  ],
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    // import all modules here
    HomeModule,
    UserModule,
    CredentialModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
