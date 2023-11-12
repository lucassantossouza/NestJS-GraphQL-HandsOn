/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlingService } from 'src/modules/error-handling/error-handling.service';

@Injectable()
export class ErrorHandlingMiddleware implements ExceptionFilter {
  // gerar um interceptor para tratar os erros diversos e retornar um erro padronizado para o front{
  //     statusCode: 500,
  //     timestamp: new Date().toISOString(),
  //     path: req.url,
  //     message: err.message,
  //   }
  constructor() {}
  private readonly errorHandlingService: ErrorHandlingService =
    new ErrorHandlingService();

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Erro genérico na aplicação';

    switch (status) {
      case HttpStatus.NOT_FOUND:
        return response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          ...(await this.errorHandlingService.handleNotFound(status, message)),
        });
      case HttpStatus.FORBIDDEN:
        return response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          ...(await this.errorHandlingService.handleForbidden(status, message)),
        });
      case HttpStatus.UNAUTHORIZED:
        return response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          ...(await this.errorHandlingService.handleUnauthorized(
            status,
            message,
          )),
        });
      case HttpStatus.BAD_REQUEST:
        return response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          ...(await this.errorHandlingService.handleBadRequest(
            status,
            message,
          )),
        });
      default:
        return response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: message,
        });
    }
  }
}
