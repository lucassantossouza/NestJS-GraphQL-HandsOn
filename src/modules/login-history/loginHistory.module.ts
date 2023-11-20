import { Global, Module } from '@nestjs/common';
import { LoginHistoryService } from './loginHistory.service';
import { LoginHistoryController } from './loginHistory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginHistory } from './entities/loginHistory.entity';

@Global()
@Module({
  controllers: [LoginHistoryController],
  providers: [LoginHistoryService],
  imports: [TypeOrmModule.forFeature([LoginHistory])],
  exports: [LoginHistoryService],
})
export class LoginHistoryModule {}
