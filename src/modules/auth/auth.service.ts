import { TokenService } from './../token/token.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialService } from 'src/modules/credential/credential.service';
import { EncryptUtils } from 'src/utils/encrypt.utils';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginHistoryService } from '../loginHistory/loginHistory.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly credentialService: CredentialService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly loginHistoryService: LoginHistoryService,
  ) {}
  async signIn(user: string, password: string, ip: string): Promise<any> {
    const credential = await this.credentialService.getOne({ user });
    if (!credential) {
      /**
       * Usuario não encontrado no banco de dados, gera um log de acesso com o motivo e retorna a exceção para o usuário
       */
      this.loginHistoryService.create({
        username: user,
        failReason: 'User not found',
        success: false,
        ip,
      });
      return new UnauthorizedException('Usuário ou senha inválidos');
    }

    // TODO: Verificar se o usuário está bloqueado e retornar o problema precisa implementar

    const encryptUtils = new EncryptUtils();

    /**
     * Verifica se a senha informada confere com a senha armazenada no banco de dados, gera um log de acesso com o motivo e retorna a exceção para o usuário
     */
    if (
      !(await encryptUtils.compare(
        password,
        credential.password,
        credential.salt,
      ))
    ) {
      this.loginHistoryService.create({
        username: user,
        failReason: 'Password does not match',
        success: false,
        ip,
        credentialId: credential.id,
      });
      return new UnauthorizedException('Usuário ou senha inválidos');
    }

    /**
     * Deleta todos os tokens de acesso do usuário no banco de dados
     */
    await this.tokenService.deleteAll({ credentialId: credential.id });

    // generate token set in payload
    const token = await encryptUtils.encrypt(
      // generate token based on milliseconds
      new Date().getTime().toString(),
    );

    // get env token expire in minutes
    const tokenExpireIn = parseInt(process.env.TOKEN_EXPIRES_IN || '60', 10);

    const date = new Date();
    // set date to expire token in format timestamp
    // date.setMinutes(date.getMinutes() + parseInt(tokenExpireIn) + 180);

    // TODO: Validar como verificar se o token expirou timestamp não esta inserindo corretamente o horario do servidor esta inserindo o horario do cliente
    date.setMinutes(date.getMinutes() + tokenExpireIn + 180);

    const tokenData = await this.tokenService.create({
      credentialId: credential.id,
      token: token.hash,
      salt: token.salt,
      expiresIn: date,
    });

    /**
     * Verifica se o token foi gerado, caso não tenha sido gera um log de acesso com o motivo e retorna a exceção para o usuário
     */
    if (!tokenData) {
      this.loginHistoryService.create({
        username: user,
        failReason: 'Token not generated',
        success: false,
        ip,
        credentialId: credential.id,
      });
      // TODO: se o contador de falhas de login não estiver zerado, zerar pois o usuário conseguiu logar porem houve uma falha na geração do token implementar aqui
      new LoggerService().error(
        'Usuário não conseguiu token de acesso para autenticação',
      ); //return new BadRequestException();
    }

    const { name, nickname, email, phone, id } = await this.userService.getOne({
      credentialId: credential.id,
    });

    const payload = {
      name,
      nickname,
      email,
      phone,
      token: tokenData.token,
      sub: id,
    };

    /**
     * Gera um log resultado da tentativa de login com sucesso
     */
    this.loginHistoryService.create({
      username: user,
      success: true,
      ip,
      credentialId: credential.id,
    });
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
