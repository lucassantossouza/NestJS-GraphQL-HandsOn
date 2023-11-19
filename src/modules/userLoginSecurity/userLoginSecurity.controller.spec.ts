import { Test, TestingModule } from '@nestjs/testing';
import { UserLoginSecurityController } from './userLoginSecurity.controller';
import { UserLoginSecurityService } from './userLoginSecurity.service';

describe('UserLoginSecurityController', () => {
  let controller: UserLoginSecurityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLoginSecurityController],
      providers: [UserLoginSecurityService],
    }).compile();

    controller = module.get<UserLoginSecurityController>(
      UserLoginSecurityController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
