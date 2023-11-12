/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseErrorService {
  handleConnectionError(error: any) {
    throw new Error('Method not implemented.');
  }

  handleDuplicateKeyError(error: any) {
    throw new Error('Method not implemented.');
  }

  handleForeignKeyError(error: any) {
    throw new Error('Method not implemented.');
  }

  handleUnknownError(error: any) {
    throw new Error('Method not implemented.');
  }

  handleRecordNotFoundError(error: any) {
    throw new Error('Method not implemented.');
  }
}
