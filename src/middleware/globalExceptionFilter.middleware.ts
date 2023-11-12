import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      // Se for uma exceção HTTP, você pode lidar com ela aqui
      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        message: exception.message,
      });
    } else {
      // Caso contrário, é uma exceção global
      console.error('Erro global:', exception);

      // Adicione aqui a lógica para tratamento de erro, como relatório de erros ou notificação.

      response.status(500).json({
        statusCode: 500,
        message: 'Ocorreu um erro interno do servidor.',
      });
    }
  }
}
