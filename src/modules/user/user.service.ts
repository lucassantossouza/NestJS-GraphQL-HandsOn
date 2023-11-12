/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Module } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { Credential } from 'src/entities/credential.entity';
import { CreateUserDto } from './user.dto';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
  ) {}
  async create(data: CreateUserDto): Promise<User> {
    const credential = new Credential();
    const { user: email, password } = data?.credential || {};
    credential.user = email;
    credential.password = password;
    // create credential first and get the id
    const { id: credentialId } =
      await this.credentialRepository.save(credential);

    const user = new User();
    user.name = data.name;
    user.nickname = data.nickname;
    user.email = email;
    user.credentialId = credentialId;
    user.phone = data.phone;

    return await this.userRepository.save(user);
  }
}
