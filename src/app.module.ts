import { Module } from '@nestjs/common';

import { HomeModule } from './modules/home/home.module';
import { UserModule } from './modules/user/user.module';
import { CredentialModule } from './modules/credential/credential.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { DatabaseModule } from './modules/database/database.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  providers: [],
  imports: [
    // import all modules here
    LoggerModule,
    TokenModule,
    AuthModule,
    HomeModule,
    UserModule,
    CredentialModule,
    DatabaseModule,
  ],
  controllers: [],
})
export class AppModule {}
