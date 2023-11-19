import { Module } from '@nestjs/common';
import { DatabaseMinimalController } from './databaseMinimal.controller';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  controllers: [DatabaseMinimalController],
  exports: [DatabaseService],
})
export class DatabaseMinimalModule {}
