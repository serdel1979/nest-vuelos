import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guards';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('api/v1/user')
export class UserController {


    constructor(private readonly userService: UserService){}

    @Post()
    @ApiOperation({ summary:' Create User'})
    create(@Body() userDTO: UserDTO){
        return this.userService.create(userDTO);
    }

    @Get()
    @ApiOperation({ summary:' Get all users'})
    getAll(){
        return this.userService.getUsers();
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.userService.getOne(id);
    }


    @Delete(':id')
    delete(@Param('id') id: string){
        return this.userService.delete(id);
    }


    @Put(':id')
    update(@Param('id') id: string, @Body() userDTO: UserDTO ){
        return this.userService.update(id, userDTO);
    }

   // @Put(':id')
   // update(@Param('id') id: string, @Body() userDTO: UserDTO) {
   //     return this.userService.update(id, userDTO);
   // }

}
