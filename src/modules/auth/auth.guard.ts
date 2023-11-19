import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Token } from '../token/entities/token.entity';
// import { Repository } from 'typeorm';
import { TokenService } from '../token/token.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../token/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService, // private readonly credentialService: CredentialService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly tokenService: TokenService,
  ) {}

  // TODO: Colocar as regras de validação

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenAuth = this.extractTokenFromHeader(request);
    console.log('token auth', tokenAuth);

    // TODO: Acesso sem token - gerar log
    if (!tokenAuth) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(tokenAuth, {
        secret: process.env.JWT_SECRET,
      });
      // TODO: Implementar a validação para pegar dentro do payload o token e validar se existe na base de dados e se o id do usuário é o mesmo caso contrario deslogar o usuário e gerar log

      // const tokenData = await this.tokenService.getOne({
      //   token: payload.token,
      // });

      // pegar o somente o token para ver se existe na base de dados pois pode ser que o usuario tenha alterado o token e o mesmo não existe na base de dados
      // TODO: gerar relatorio token não existe na base de dados possivelmente o usuario alterou o token formando um ataque de força bruta
      const tokenExist = await this.tokenRepository.findOne({
        where: { token: payload.token },
      });

      console.log('token exist', tokenExist);
      if (!tokenExist) throw new UnauthorizedException();

      // get token data and check expired by token
      // SELECT * FROM token t WHERE TIMESTAMPDIFF(MINUTE, t.expiresIn, CURRENT_TIMESTAMP) >= 0
      // TODO: Token expirado - gerar log token expirado usuario não autenticado
      const tokenData = await this.tokenRepository
        .createQueryBuilder('t')
        .where(
          'TIMESTAMPDIFF(MINUTE, CURRENT_TIMESTAMP, t.expiresIn) >= 0 AND t.token like :token',
          {
            token: payload.token,
          },
        )
        .getOne();

      console.log('token data', tokenData);

      if (!tokenData) throw new UnauthorizedException();

      request['user'] = payload;
    } catch (error) {
      console.log('error', error);
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
