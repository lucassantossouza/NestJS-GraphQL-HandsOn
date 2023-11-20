import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request as ReqExpress } from 'express';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() data: AuthSignInDto, @Req() req: ReqExpress): Promise<any> {
    // get ip from request
    const ip = (
      req.headers['x-forwarded-for'] || req.socket.remoteAddress
    ).toString();
    return this.authService.signIn(data.user, data.password, ip);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
