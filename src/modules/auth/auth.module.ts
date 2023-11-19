import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { CredentialModule } from '../credential/credential.module';
// import { TokenModule } from '../token/token.module';
import { HomeModule } from '../home/home.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Token } from '../token/entities/token.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Token]),
    // TokenModule,
    UserModule,
    CredentialModule,
    HomeModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
