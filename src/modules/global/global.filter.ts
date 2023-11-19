/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { CannotCreateEntityIdMapError } from 'typeorm/error/CannotCreateEntityIdMapError';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class GlobalFilter<T> extends LoggerService implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message =
      (exception as any)?.message?.message ||
      (exception as any)?.message ||
      'Internal server error';
    let code = (exception as any)?.code || 'HttpException';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case HttpException:
        status = (exception as any).getStatus();
        break;
      case QueryFailedError:
        status = HttpStatus.BAD_REQUEST;
        message = (exception as QueryFailedError).message;
        code = (exception as any).code;
        this.error(message, false);
        break;
      case EntityNotFoundError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        code = (exception as any).code;
        this.error(message, false);
        break;
      case CannotCreateEntityIdMapError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        code = (exception as any).code;
        this.error(message, false);
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.error(message, false);
        break;
    }

    response.status(status).json({
      // statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      // code,
      message,
      method: request.method,
      // get error stack by LoggerService
      ...((exception as any)?.response?.stack || {}),
    });
  }
}
