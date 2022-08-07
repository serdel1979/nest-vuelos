import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { UserAuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private jwtService: JwtService){}

    async signIn(userDto: UserAuthDTO){
        const { username, password } = userDto;
        const userfind = await this.userService.findByUserName(username);
        console.log("usr encontrado ",userfind);
        if(!userfind) throw new HttpException('Usuario o clave incorrecto',403);

        const checkPassword = await compare(password,userfind.password);
        if(!checkPassword) throw new HttpException('Usuario o clave incorrecto',403); 

        const payload = {id:userfind._id, username:userfind.username}
        console.log("payload ",payload);
  
        const token = await this.jwtService.signAsync(payload);
      
        console.log("token",token);
        const data = {
            user: userfind.username,
            token,
        }  
        return data;
    }

}
