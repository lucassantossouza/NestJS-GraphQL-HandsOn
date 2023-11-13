import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Home Page')
@Controller()
export class HomeController {
  @Get()
  @ApiOperation({
    summary: 'Página inicial',
    description:
      'Página inicial da API, retorna uma mensagem de boas vindas e algumas informações sobre a API.',
  })
  helloWorld(@Req() req: Request) {
    return {
      message: 'Bem vindo ao NestJS ORM',
      version: process.env.npm_package_version,
      description: 'API de exemplo com NestJS e TypeORM',
      author: 'Lucas Santos',
      github: 'https://github.com/lucassantossouza',
      personalEmail: 'lucassouzamda@gmail.com',
      workEmail: 'contato@tiwiki.com.br',
      site: 'https://tiwiki.com.br',
      // get url
      swagger: req.protocol + '://' + req.get('host') + '/swagger',
    };
  }

  @Get('test')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Página inicial',
    description:
      'Página inicial da API, para testar o middleware de autenticação.',
  })
  test() {
    return {
      message: 'Bem vindo ao NestJS ORM',
    };
  }
}
