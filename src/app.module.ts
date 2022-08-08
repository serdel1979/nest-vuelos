import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.development'],
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.URI_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }),
    UserModule,
    PassengerModule,
    FlightModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
  exports: [AuthService]
})
export class AppModule { }
