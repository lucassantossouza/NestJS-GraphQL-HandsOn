/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Credential } from 'src/entities/credential.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  GetUserDto,
  DeleteUserDto,
} from './user.dto';
import { CreateCredentialDto } from '../credential/credential.dto';

@Injectable()
export class UserService {
  // async create(user: CreateUserDto, credential: CreateCredentialDto): User {
  // }
  // findAll(): User[] {
  //   return this.userRepository.find();
  // }
  // findOne(id: GetUserDto): User {
  //   return this.findOne(id);
  // }
  // update(id: GetUserDto, user: UpdateUserDto): User {
  //   const userToUpdate = this.findOne(id);
  //   userToUpdate.name = user.name;
  //   userToUpdate.nickname = user.nickname;
  //   userToUpdate.email = user.email;
  //   userToUpdate.phone = user.phone;
  //   return userToUpdate;
  // }
  // // remover logicamente alterando o campo deletedAt
  // remove(id: DeleteUserDto): User {
  //   const userToRemove = this.findOne(id);
  //   userToRemove.deletedAt = new Date();
  //   return userToRemove;
  // }
}
