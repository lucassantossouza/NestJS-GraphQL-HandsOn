import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SlackService {
  private readonly webhookUrl: string;
  private readonly logger = new Logger(SlackService.name);

  constructor() {
    this.webhookUrl = process.env.SLACK_WEBHOOK_URL;
  }

  async send(message: string, level: 'log' | 'error' | 'warn', data?: any) {
    const colorMap = {
      log: '#36A64F', // green
      warn: '#FFAE42', // yellow
      error: '#FF0000', // red
    };

    const attachmentsFields = [
      {
        title: 'Message',
        value: message,
        short: false,
      },
    ];

    if (data) {
      attachmentsFields.push({
        title: 'Details',
        value: JSON.stringify(data),
        short: false,
      });
    }

    const payload = {
      attachments: [
        {
          color: colorMap[level],
          fields: attachmentsFields,
          footer: 'NestJS API - Slack Integration LOGGER',
          ts: Math.floor(new Date().getTime() / 1000),
        },
      ],
    };

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (response.status !== 200) {
        this.logger.error(
          `Slack API error: ${response.status} - ${response.statusText}`,
        );
      }
    } catch (error) {
      this.logger.error(`Slack API error: ${error}`);
    }
  }
}
