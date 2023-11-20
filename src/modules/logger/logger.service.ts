import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SlackService } from '../slack/slack.service';

@Injectable()
export class LoggerService {
  private readonly slack = new SlackService();
  private readonly logger = new Logger(LoggerService.name);
  private level: 'log' | 'error' | 'warn';
  protected response = {};

  /**
   * Geral: Para logs de informações gerais.
   * @param message Mensagem ou objeto a ser logado.
   */
  log(message: any) {
    this.level = 'log';
    const stackTrace = this.getStackTrace();
    this.logger.log(`${message} [Called by: ${stackTrace.trim()}]`);
    this.handleException(message, false, stackTrace);
  }

  /**
   * Aviso: Para situações que merecem atenção, mas não são erros.
   * @param message Mensagem ou objeto a ser logado.
   */
  warn(message: any) {
    this.level = 'warn';
    const stackTrace = this.getStackTrace();
    this.logger.warn(`${message} [Called by: ${stackTrace.trim()}]`);
    this.handleException(message, false, stackTrace);
  }

  /**
   * Erro: Para registrar erros que ocorrem na aplicação.
   * @param message Mensagem ou objeto a ser logado.
   */
  error(message: any, critical: boolean = true) {
    this.level = 'error';
    const stackTrace = this.getStackTrace();
    this.logger.error(`${message} [Called by: ${stackTrace.trim()}]`);
    this.handleException(message, critical, stackTrace);
  }

  /**
   * Manipula exceções e integra com sistemas externos como Slack.
   * @param error Erro ou mensagem a ser tratada.
   * @param critical Indica se o erro é crítico.
   * @param stack A pilha de chamadas de uma exceção, se houver.
   * @param status O status HTTP a ser usado para exceções HTTP.
   */
  private handleException(
    error: any,
    critical: boolean = false,
    stack: string = '',
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    status = critical ? HttpStatus.INTERNAL_SERVER_ERROR : status;

    let message =
      'Erro desconhecido. Consulte o log da requisição para mais detalhes.';
    let response = {};

    const stackSplit = {
      file: stack.split(' ')?.[0],
      line: (stack.split(':')?.[2] || '').replaceAll(/\D/g, ''),
      column: (stack.split(':')?.[3] || '').replaceAll(/\D/g, ''),
    };

    if (/prd|prod/.test(process.env.NODE_ENV)) {
      message =
        'Serviço indisponível no momento, nosso time já foi notificado e está trabalhando para resolver o problema. Por favor, tente novamente mais tarde.';
    } else {
      message = error || message;

      response = {
        error,
        stack: stackSplit,
      };
    }

    // TODO: add error notification service for administrators, such as email, slack (para logs), among others.
    // Aqui, você pode adicionar a integração com o Slack ou outros serviços.
    // Exemplo: this.sendToSlack(error);

    this.slack.send(message, this.level, {
      ...response,
      stack: stackSplit,
      stackTrace: stack,
    });

    response['message'] = message;

    this.response = response;

    if (critical) throw new HttpException(response, status);
  }

  /**
   * Obtém a pilha de chamadas de uma exceção, se houver. Com ele podemos obter o nome do arquivo, a linha e a coluna onde ocorreu o erro.
   * @returns Retorna o nome do arquivo, a linha e a coluna onde ocorreu o erro.
   * @example
   * const stackTrace = this.getStackTrace(err);
   * console.log(stackTrace);
   * // Output: AuthService.signIn (C:\Users\lucas\OneDrive\Documentos\Git\TiWiki\NestJS-GraphQL-HandsOn\src\modules\auth\auth.service.ts:22:32
   * // Onde 22 é a linha e 32 é a coluna e o arquivo é auth.service.ts
   */
  private getStackTrace() {
    const stack = new Error().stack;
    const stackArray = stack.split('\n');
    const callerLine = stackArray[3];
    const stackTrace = callerLine.split('at ')[1];
    return stackTrace;
  }

  // Método hipotético para enviar logs para o Slack.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private sendToSlack(message: any) {
    // Implementação da lógica de envio para o Slack.
  }
}
