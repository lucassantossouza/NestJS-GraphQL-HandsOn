import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // TODO: Colocar as regras de validação

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenAuth = this.extractTokenFromHeader(request);

    // TODO: Acesso sem token - gerar log
    if (!tokenAuth) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(tokenAuth, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;

      // TODO: Implementar a validação para pegar dentro do payload o token e validar se existe na base de dados e se o id do usuário é o mesmo caso contrario deslogar o usuário e gerar log
    } catch (error) {
      // TODO: Token inválido - gerar log
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
