import { Module } from '@nestjs/common';
import { DatabaseErrorService } from './database.service';

@Module({
  providers: [DatabaseErrorService],
})
export class DatabaseModule {}
