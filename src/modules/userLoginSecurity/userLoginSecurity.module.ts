import { Module } from '@nestjs/common';
import { UserLoginSecurityService } from './userLoginSecurity.service';
import { UserLoginSecurityController } from './userLoginSecurity.controller';

@Module({
  controllers: [UserLoginSecurityController],
  providers: [UserLoginSecurityService],
})
export class UserLoginSecurityModule {}
