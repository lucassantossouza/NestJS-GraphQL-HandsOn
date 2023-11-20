import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLoginHistoryDto {
  @IsNotEmpty({ message: 'O campo username é obrigatório' })
  @ApiProperty({
    title: 'username',
    description: 'Nome de usuário utilizado na tentativa de login',
    required: true,
    example: 'joaozinho@jj.com',
  })
  username: string;

  @IsNotEmpty({ message: 'O campo success é obrigatório' })
  @IsBoolean({ message: 'O campo success deve ser um booleano' })
  @ApiProperty({
    title: 'success',
    description: 'Indica se a tentativa de login foi bem sucedida',
    required: true,
    example: true,
  })
  success: boolean;

  @IsOptional()
  @ApiProperty({
    title: 'ip',
    description: 'IP de origem da tentativa de login',
    required: false,
    example: '185.23.199.10',
  })
  ip?: string;

  @IsOptional()
  @ApiProperty({
    title: 'failReason',
    description:
      'Motivo da falha da tentativa de login (Em caso de falha de login)',
    required: false,
    example: 'Usuário não encontrado',
  })
  failReason?: string;

  @IsOptional()
  @ApiProperty({
    title: 'credentialId',
    description:
      'Id da credencial (Em casos de falha de login, o id da credencial pode não ser encontrado)',
    required: false,
    example: 1,
  })
  credentialId?: number;
}
