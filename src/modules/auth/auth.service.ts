import { TokenService } from './../token/token.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CredentialService } from 'src/modules/credential/credential.service';
import { EncryptUtils } from 'src/utils/encrypt.utils';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly credentialService: CredentialService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}
  async signIn(user: string, password: string): Promise<any> {
    // TODO: Gerar log de acesso quando usuario não encontrado
    const credential = await this.credentialService.getOne({ user });

    if (!credential?.password) return new UnauthorizedException();

    const encryptUtils = new EncryptUtils();

    // TODO: Gerar log de acesso quando senha não confere
    if (
      !(await encryptUtils.compare(
        password,
        credential.password,
        credential.salt,
      ))
    )
      return new UnauthorizedException();

    // generate token set in payload
    const token = await encryptUtils.encrypt(
      // generate token based on milliseconds
      new Date().getTime().toString(),
    );

    // get env token expire in minutes
    const tokenExpireIn = process.env.Token_EXPIRES_IN || '60';

    const date = new Date();
    // set date to expire token in format timestamp
    date.setMinutes(date.getMinutes() + parseInt(tokenExpireIn) + 180);

    const tokenData = await this.tokenService.create({
      credentialId: credential.id,
      token: token.hash,
      salt: token.salt,
      expiresIn: date,
    });

    // TODO: Gerar log e possivelmente um alerta para informar que o token não foi gerado e verficar a causa
    if (!tokenData) return new BadRequestException();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    // TODO: Gerar log de acesso quando token foi gerado com sucesso representa que o usuário está logado
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
