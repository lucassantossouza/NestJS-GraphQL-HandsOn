import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginHistory } from './entities/loginHistory.entity';
import { Repository } from 'typeorm';
import { CreateLoginHistoryDto } from './dto/loginHistory.dto';

@Injectable()
export class LoginHistoryService {
  constructor(
    @InjectRepository(LoginHistory)
    private readonly loginHistoryRepository: Repository<LoginHistory>,
  ) {}

  async create(data: CreateLoginHistoryDto): Promise<LoginHistory> {
    return await this.loginHistoryRepository.save(data);
  }
}
