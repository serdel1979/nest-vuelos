import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategys/jwtstrategy';

@Module({
  imports:[
    UserModule, 
    PassportModule, 
    JwtModule.register({
        secret: "JWTclav3s3cr3t4@Api",
        signOptions:{
          expiresIn: process.env.EXPIRES_IN,
          audience: process.env.APP_URL,
        },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
