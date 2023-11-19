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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/modules/user/entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { CreateCredentialDto } from '../credential/dto/credential.dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

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
