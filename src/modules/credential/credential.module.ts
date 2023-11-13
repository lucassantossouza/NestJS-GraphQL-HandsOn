import { Module } from '@nestjs/common';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from 'src/entities/credential.entity';

@Module({
  controllers: [CredentialController],
  providers: [CredentialService],
  imports: [TypeOrmModule.forFeature([Credential])],
  exports: [CredentialService],
})
export class CredentialModule {}
