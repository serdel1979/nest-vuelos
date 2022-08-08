import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guards';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('passengers')
@Controller('api/v1/passenger')
export class PassengerController {

    constructor(private passengerService: PassengerService){}

    @Post()
    create(@Body() passengerDTO: PassengerDTO){
        return this.passengerService.create(passengerDTO);
    }

    @Get()
    getAll(){
        return this.passengerService.getPassenger();
    }


    @Get(':id')
    getOne(@Param('id') id: string){
        return this.passengerService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.passengerService.delete(id);
    }


    @Put(':id')
    update(@Param('id') id: string, @Body() passengerDTO: PassengerDTO ){
        return this.passengerService.update(id, passengerDTO);
    }


}
