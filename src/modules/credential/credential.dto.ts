//cria as validações dos dados que serão recebidos
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateCredentialDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Nome de login do usuário',
    example: 'joaozin@joao.com',
  })
  identifier: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @ApiProperty({
    required: true,
    description:
      'Senha do usuário (mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial)',
    example: 'Senha123@',
  })
  password: string;
}
