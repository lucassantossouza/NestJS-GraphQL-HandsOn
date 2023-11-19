//cria as validações dos dados que serão recebidos
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateCredentialDto {
  @IsEmail({}, { message: 'Usuário não digitou um email válido' })
  @IsNotEmpty({ message: 'Usuário é obrigatório' })
  @ApiProperty({
    required: true,
    description: 'Email do usuário',
    example: 'joaozinho@joao.com',
  })
  user: string;

  @IsString({ message: 'Senha não está em formato válido' })
  @IsNotEmpty({ message: 'Senha é obrigatório' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    // mostra a mensagem de acordo com a validação que não passou
    {
      message:
        'A senha digitada não atende aos requisitos mínimos de segurança. A senha deve ter no mínimo 8 caracteres, sendo pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial',
    },
  )
  @ApiProperty({
    required: true,
    description: 'Senha do usuário',
    example: 'Senha123@',
  })
  password: string;
}

export class GetOneCredentialDto {
  @IsNotEmpty({ message: 'Nome de login do usuário é obrigatório' })
  @IsString({ message: 'Nome de login do usuário não está em formato válido' })
  @ApiProperty({
    required: true,
    description: 'Nome de login do usuário',
    example: 'Amanda',
  })
  user: string;
}
