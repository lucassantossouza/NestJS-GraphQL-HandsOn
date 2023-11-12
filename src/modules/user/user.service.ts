/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  Module,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { Credential } from 'src/entities/credential.entity';
import { CreateUserDto } from './user.dto';
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
    // set validation error if email already exists
    if (id) {
      // throw new HttpException(
      //   {
      //     message: 'Não foi possível criar o usuário',
      //   },
      //   HttpStatus.BAD_REQUEST,
      // );
      // return Promise.reject({
      //   statusCode: HttpStatus.BAD_REQUEST,
      //   message: 'Não foi possível criar o usuário',
      // });
      throw new ApiResponse(
        { message: 'Não foi possível criar o usuário' },
        400,
      );
    }

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
