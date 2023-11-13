import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthSignInDto {
  @IsNotEmpty({ message: 'Usuário é obrigatório' })
  @ApiProperty({
    required: true,
    description: 'Email do usuário',
    example: 'zezinho@joa.com',
  })
  user: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @ApiProperty({
    required: true,
    description: 'Senha do usuário',
    example: '123456',
  })
  password: string;
}
