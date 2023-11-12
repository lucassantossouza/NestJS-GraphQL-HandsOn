/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlingService {
  handleUnauthorized(status: HttpStatus, message: string | object) {
    return this.treatMessage({
      defaultMessage: 'Você não está autorizado a acessar este recurso',
      message,
    });
  }
  handleForbidden(status: HttpStatus, message: string | object) {
    return this.treatMessage({
      defaultMessage: 'Você não tem permissão para acessar este recurso',
      message,
    });
  }
  handleNotFound(status: HttpStatus, message: string | object) {
    return this.treatMessage({
      defaultMessage: 'A página que você está tentando acessar não existe',
      message,
    });
  }
  handleBadRequest(status: HttpStatus, message: string | object) {
    return this.treatMessage({
      defaultMessage: 'Desculpe, não foi possível processar sua requisição',
      message,
    });
  }
  private treatMessage(args: {
    message: string | object;
    defaultMessage?: string | null;
  }) {
    const { message, defaultMessage } = args;
    return message && message?.['customResponse']
      ? message?.['response']
      : {
          message: defaultMessage || 'Não foi possível processar a requisição',
        };
  }
}
