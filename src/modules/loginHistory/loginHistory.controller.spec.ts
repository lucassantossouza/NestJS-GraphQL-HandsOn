import { Test, TestingModule } from '@nestjs/testing';
import { LoginHistoryController } from './loginHistory.controller';
import { LoginHistoryService } from './loginHistory.service';

describe('LoginHistoryController', () => {
  let controller: LoginHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginHistoryController],
      providers: [LoginHistoryService],
    }).compile();

    controller = module.get<LoginHistoryController>(LoginHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
