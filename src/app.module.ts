import { Module } from '@nestjs/common';

import { HomeModule } from './modules/home/home.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // import all modules here
    HomeModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
