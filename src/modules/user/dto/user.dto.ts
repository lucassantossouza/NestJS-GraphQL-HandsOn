//cria as validações dos dados que serão recebidos
import { ApiProperty } from '@nestjs/swagger';
import { CreateCredentialDto } from '../../credential/dto/credential.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome não está em formato válido' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  @MaxLength(254, { message: 'Nome deve ter no máximo 254 caracteres' })
  @ApiProperty({
    required: true,
    description: 'Nome completo do usuário',
    example: 'João da Silva',
  })
  name: string;

  // nickname
  @IsOptional()
  @IsString({
    message: 'Apelido ou nome para exibição não está em formato válido',
  })
  @MinLength(3, {
    message: 'Apelido ou nome para exibição deve ter no mínimo 3 caracteres',
  })
  @MaxLength(254, {
    message: 'Apelido ou nome para exibição deve ter no máximo 254 caracteres',
  })
  @ApiProperty({
    required: false,
    description: 'Apelido ou nome para exibição do usuário',
    example: 'Joãozinho',
  })
  nickname?: string;

  @IsEmail({}, { message: 'Email não está em formato válido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @MaxLength(254, { message: 'Email deve ter no máximo 254 caracteres' })
  @ApiProperty({
    required: true,
    description: 'Email do usuário',
    example: 'joaozinho@joao.com',
  })
  email: string;

  @IsPhoneNumber('BR', {
    message: 'Telefone celular não está em formato válido',
  })
  @IsNotEmpty({ message: 'Telefone celular é obrigatório' })
  @MaxLength(11, {
    message: 'Telefone celular deve ter no máximo 11 caracteres (DDD + número)',
  })
  @ApiProperty({
    required: true,
    description: 'Telefone celular do usuário',
    example: '11999999999',
  })
  phone: string;

  // set type to CreateCredentialDto
  @ApiProperty({
    required: true,
    description: 'Credenciais do usuário',
    type: CreateCredentialDto,
  })
  credential: CreateCredentialDto;
}

export class GetOneUserDto {
  // credential id
  @IsNotEmpty({ message: 'ID da credencial é obrigatório' })
  // check if number or numeric string
  @IsNumberString(
    { no_symbols: true },
    { message: 'ID da credencial inválido' },
  )
  @ApiProperty({
    required: true,
    description: 'ID da credencial do usuário',
    example: 1,
  })
  credentialId: number;
}
