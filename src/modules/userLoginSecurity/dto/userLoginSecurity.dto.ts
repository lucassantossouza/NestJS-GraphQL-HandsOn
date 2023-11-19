import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateUserLoginSecurityDto {
  @IsNotEmpty({ message: 'O ID da Credecial é obrigatório' })
  @IsNumberString({}, { message: 'O ID da Credecial deve ser um número' })
  @ApiProperty({
    required: true,
    description: 'ID da Credecial do usuário',
    example: '1',
  })
  credentialId: number;

  @IsBoolean({ message: 'O campo "Bloqueado" deve ser um booleano' })
  @ApiProperty({
    required: false,
    default: false,
    description: 'Mostra se o usuário está bloqueado',
    example: true,
  })
  locked?: boolean;

  @IsNotEmpty({ message: 'O ID do histórico de bloqueio é obrigatório' })
  @IsNumberString(
    {},
    { message: 'O ID do histórico de bloqueio deve ser um número' },
  )
  @ApiProperty({
    required: false,
    description: 'ID do histórico do ultimo bloqueio do usuário',
    example: '1',
  })
  lockedHistoryId?: number;

  @IsBoolean({
    message: 'O campo "Requer redefinição de senha" deve ser um booleano',
  })
  @ApiProperty({
    required: false,
    default: false,
    description: 'Mostra se o usuário precisa redefinir a senha',
    example: true,
  })
  passwordResetRequired?: boolean;
}
