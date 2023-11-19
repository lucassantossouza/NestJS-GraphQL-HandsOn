import { EncryptUtils } from 'src/utils/encrypt.utils';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  Module,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Credential } from 'src/modules/credential/entities/credential.entity';
import { CreateUserDto, GetOneUserDto } from './dto/user.dto';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/exceptions/apiResponse.exceptions';

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
    // check if email already exists
    const { id } =
      (await this.credentialRepository.findOne({
        where: { user: email, deletedAt: null },
      })) || {};

    // TODO: Precisa arrumar e mudar aqui
    if (id)
      throw new ApiResponse(
        { message: 'Não foi possível criar o usuário' },
        400,
      );

    const encryptUtils = new EncryptUtils();

    credential.user = email;

    const { hash: passwordHash, salt } = await encryptUtils.encrypt(password);

    credential.password = passwordHash;
    credential.salt = salt;
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

  async getOne({ credentialId }: GetOneUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { credentialId, deletedAt: null },
    });

    if (!user) throw new NotFoundException();

    return user;
  }
}
