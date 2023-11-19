import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { SlackModule } from '../slack/slack.module';

@Global()
@Module({
  providers: [LoggerService],
  imports: [SlackModule],
  exports: [LoggerService, SlackModule],
})
export class LoggerModule {}
