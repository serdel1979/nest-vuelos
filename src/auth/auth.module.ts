import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategys/jwtstrategy';
import { jwtConstants } from 'src/config/constants';

@Module({
  imports:[
    UserModule, 
    PassportModule, 
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions:{expiresIn: "48h"},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
