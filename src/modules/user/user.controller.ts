/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  GetUserDto,
  DeleteUserDto,
} from './user.dto';
import { CreateCredentialDto } from '../credential/credential.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // findAll(): User[] {
  //   return this.userService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param() user: GetUserDto): User {
  //   return this.userService.findOne(user);
  // }

  // @Post()
  // create(@Body() user: CreateUserDto, credential: CreateCredentialDto): User {
  //   return this.userService.create(user, credential);
  // }

  // @Put(':id')
  // update(@Param() id: GetUserDto, @Body() user: UpdateUserDto): User {
  //   return this.userService.update(id, user);
  // }

  // @Delete(':id')
  // remove(@Param() user: DeleteUserDto): User {
  //   return this.userService.remove(user);
  // }
}
