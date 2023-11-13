import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialService } from 'src/modules/credential/credential.service';
import { EncryptUtils } from 'src/utils/encrypt.utils';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private credentialService: CredentialService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(user: string, password: string): Promise<any> {
    // TODO: Gerar log de acesso quando usuario não encontrado
    const credential = await this.credentialService.getOne({ user });

    if (!credential?.password) return new UnauthorizedException();

    // TODO: Gerar log de acesso quando senha não confere
    if (
      !(await new EncryptUtils().compare(
        password,
        credential.password,
        credential.salt,
      ))
    )
      return new UnauthorizedException();

    const userData = await this.userService.getOne({
      credentialId: credential.id,
    });

    const payload = { ...userData, sub: userData.id };

    // generate token set in payload

    // TODO: Gerar log de acesso quando token foi gerado com sucesso representa que o usuário está logado
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
