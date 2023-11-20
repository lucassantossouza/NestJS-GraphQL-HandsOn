import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenService } from '../token/token.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../token/entities/token.entity';
import { Repository } from 'typeorm';
import { LoginHistoryService } from '../loginHistory/loginHistory.service';
// import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService, // private readonly credentialService: CredentialService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly tokenService: TokenService,
    private readonly loginHistoryService: LoginHistoryService,
  ) {}

  // TODO: Colocar as regras de validação

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenAuth = this.extractTokenFromHeader(request);

    // TODO: Acesso sem token criar um contador e bloquear o ip por 5 minutos
    if (!tokenAuth) {
      this.loginHistoryService.create({
        username: 'anonymous',
        failReason: 'Token not found',
        success: false,
        ip: request.headers['x-forwarded-for'] || request.socket.remoteAddress,
      });
      throw new UnauthorizedException('Usuário não autenticado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(tokenAuth, {
        secret: process.env.JWT_SECRET,
      });

      console.log('payload', payload);

      const tokenExist = await this.tokenRepository.findOne({
        where: { token: payload.token },
      });

      if (!tokenExist) {
        this.loginHistoryService.create({
          username: payload.email || 'anonymous',
          failReason: 'Token not found',
          success: false,
          ip:
            request.headers['x-forwarded-for'] || request.socket.remoteAddress,
        });
        // gerar um contador de tentativas de acesso com token inválido e bloquear o ip por 5 minutos
        throw new UnauthorizedException('Usuário não autenticado');
      }

      // get token data and check expired by token
      // SELECT * FROM token t WHERE TIMESTAMPDIFF(MINUTE, t.expiresIn, CURRENT_TIMESTAMP) >= 0
      // TODO: Token expirado - gerar log token expirado usuario não autenticado
      const tokenData = await this.tokenRepository
        .createQueryBuilder('t')
        .where(
          'TIMESTAMPDIFF(MINUTE, t.expiresIn, CURRENT_TIMESTAMP) <= :minutes AND t.token like :token',
          {
            token: payload.token,
            minutes: parseInt(process.env.TOKEN_EXPIRES_IN || '60', 10),
          },
        )
        .getOne();

      console.log('tokenData', tokenData, payload);

      if (!tokenData) {
        this.loginHistoryService.create({
          username: payload.email || 'anonymous',
          failReason: 'Token expired',
          success: false,
          ip:
            request.headers['x-forwarded-for'] || request.socket.remoteAddress,
        });
        throw new UnauthorizedException('Usuário não autenticado');
      }

      request['user'] = payload;
    } catch (error) {
      console.log('error', error);
      // TODO: Token inválido - gerar log
      this.loginHistoryService.create({
        username: 'anonymous',
        failReason: 'Token invalid',
        success: false,
        ip: request.headers['x-forwarded-for'] || request.socket.remoteAddress,
      });
      // new LoggerService().warn(error?.message || 'Token inválido');
      throw new UnauthorizedException('Usuário não autenticado');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
