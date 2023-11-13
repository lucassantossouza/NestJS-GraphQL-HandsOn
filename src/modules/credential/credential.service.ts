import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential } from 'src/entities/credential.entity';
import { Repository } from 'typeorm';
import { GetOneCredentialDto } from './credential.dto';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
  ) {}

  async getOne({ user }: GetOneCredentialDto): Promise<Credential> {
    // const { user } = data;
    // check if user exists and deletedAt is null
    return await this.credentialRepository.findOne({
      where: { user, deletedAt: null },
    });
  }
}
