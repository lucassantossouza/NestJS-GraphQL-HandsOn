import { Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';

@Global()
@Module({
  providers: [TokenService],
  imports: [TypeOrmModule.forFeature([Token])],
  exports: [TokenService, TypeOrmModule],
})
export class TokenModule {}
