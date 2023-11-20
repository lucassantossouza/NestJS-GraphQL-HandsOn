import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTokenDto,
  DeleteTokenByCredentialDto,
  DeleteTokenDto,
  GetOneTokenDto,
} from './dto/token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async create({
    credentialId,
    token,
    salt,
    expiresIn,
  }: CreateTokenDto): Promise<Token> {
    // return await this.tokenRepository.save({
    //   credentialId,
    //   token,
    //   salt,
    //   expiresIn,
    // });
    await this.tokenRepository.query(`
      INSERT INTO token (credentialId, token, salt, expiresIn)
      VALUES (${credentialId}, '${token}', '${salt}', CURRENT_TIMESTAMP + INTERVAL '${expiresIn}' MINUTE)
    `);

    // return token created
    return await this.getOne({ token });
  }

  async getOne({ token }: GetOneTokenDto): Promise<Token> {
    return await this.tokenRepository.findOne({
      where: { token, deletedAt: null },
    });
  }

  async delete({ token }: DeleteTokenDto): Promise<void> {
    await this.tokenRepository.softDelete({ token });
  }

  async deleteAll({ credentialId }: DeleteTokenByCredentialDto): Promise<void> {
    await this.tokenRepository.softDelete({ credentialId });
  }
}
