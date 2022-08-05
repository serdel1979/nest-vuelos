import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

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
