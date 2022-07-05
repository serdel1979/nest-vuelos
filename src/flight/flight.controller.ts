import { Body, Controller, Get, Post } from '@nestjs/common';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@Controller('api/v1/flight')
export class FlightController {


    constructor(private flightService: FlightService){}

    @Post()
    create(@Body() flightrDTO: FlightDTO){
        return this.flightService.create(flightrDTO);
    }

    @Get()
    getAll(){
        return this.flightService.getFlight();
    }


}
