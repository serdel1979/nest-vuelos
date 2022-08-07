import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserAuthDTO } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {

    constructor(private authService: AuthService){}


    @Post('login')
    async signin(@Body() loginAuthDto: UserAuthDTO){
        return await this.authService.signIn(loginAuthDto);
    }

  
}
