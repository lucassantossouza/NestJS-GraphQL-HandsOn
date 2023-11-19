import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateTokenDto {
  @IsNotEmpty({ message: 'Id da credencial é obrigatório' })
  @IsNumberString({}, { message: 'Id da credencial deve ser um número' })
  @ApiProperty({
    required: true,
    description: 'Id da credencial',
    example: 1,
  })
  credentialId: number;

  @IsNotEmpty({ message: 'Token é obrigatório' })
  @ApiProperty({
    required: true,
    description: 'Hash do token',
    example: 'a1b2c3d4e5f6g7h8i9j0',
  })
  token: string;

  @IsNotEmpty({ message: 'Salt é obrigatório' })
  @ApiProperty({
    required: true,
    description:
      'Salt do token utilizado para gerar o hash e posteriormente comparar com o token recebido na requisição',
    example: 'a1b2c3d4e5f6g7h8i9j0',
  })
  salt: string;

  @IsNotEmpty({ message: 'Data de expiração é obrigatório' })
  // se é uma data e se a data é maior que a data atual
  @IsDate({ message: 'Data de expiração deve ser uma data válida' })
  @ApiProperty({
    required: true,
    description: 'Data de expiração do token',
    example: '2021-01-01T00:00:00.000Z',
  })
  expiresIn: Date;
}

export class GetOneTokenDto {
  @IsNotEmpty({ message: 'Token é obrigatório' })
  @ApiProperty({
    required: true,
    description: 'Hash do token',
    example: 'a1b2c3d4e5f6g7h8i9j0',
  })
  token: string;
}

export class DeleteTokenDto {
  @IsNotEmpty({ message: 'Token é obrigatório' })
  @ApiProperty({
    required: true,
    description: 'Hash do token',
    example: 'a1b2c3d4e5f6g7h8i9j0',
  })
  token: string;
}
