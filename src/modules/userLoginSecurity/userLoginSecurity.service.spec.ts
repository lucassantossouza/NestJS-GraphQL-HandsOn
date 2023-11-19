import { Test, TestingModule } from '@nestjs/testing';
import { UserLoginSecurityService } from './userLoginSecurity.service';

describe('UserLoginSecurityService', () => {
  let service: UserLoginSecurityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLoginSecurityService],
    }).compile();

    service = module.get<UserLoginSecurityService>(UserLoginSecurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
