import { All, Controller, InternalServerErrorException } from '@nestjs/common';
import { DatabaseError } from './database';

@Controller('*')
export class DatabaseMinimalController {
  @All()
  getError() {
    // check if node env if prd or prod or production
    let payload = {
      message: null,
    };
    if (/prd|prod/.test(process.env.NODE_ENV))
      payload.message =
        'Estamos enfrentando um problema técnico. Nossa equipe já está trabalhando para resolver isso o mais rápido possível. Por favor, tente novamente mais tarde.';
    else {
      payload = {
        ...DatabaseError.error,
        message:
          'Não foi possivel conectar ao banco de dados. Verifique os logs, arquivos de configuração, variáveis de ambiente entre outros e tente novamente.',
      };
    }
    throw new InternalServerErrorException(payload);
  }
}
