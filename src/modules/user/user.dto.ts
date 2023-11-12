//cria as validações dos dados que serão recebidos
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Nome do usuário',
    example: 'João',
    type: String,
  })
  name: string;

  @IsString()
  @ApiProperty({
    required: false,
    description: 'Apelido do usuário ou como ele prefere ser chamado',
    example: 'Joãozin',
  })
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Email do usuário',
    example: 'joaozin@jao.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  // set validate phone number
  @IsPhoneNumber('BR')
  // set regex to validate phone number
  @ApiProperty({
    required: true,
    description: 'Telefone do usuário (somente números com DDD)',
    example: '11912345678',
  })
  phone: string;

  // @IsNumber()
  // @ApiProperty()
  // credentialId: number;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(11)
  @ApiProperty()
  phone: string;
}

export class GetUserDto {
  @IsNumber()
  @ApiProperty()
  id: number;
}

export class DeleteUserDto {
  @IsNumber()
  @ApiProperty()
  id: number;
}
