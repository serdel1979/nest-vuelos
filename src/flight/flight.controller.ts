import { Body, Controller, Delete, Get, Param, Patch, Post, Put, HttpException } from '@nestjs/common';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';
import { PassengerService } from '../passenger/passenger.service';
import { PassengerDTO } from '../passenger/dto/passenger.dto';

@Controller('api/v1/flight')
export class FlightController {


    constructor(private flightService: FlightService, private passengerService: PassengerService){}

    @Post()
    create(@Body() flightrDTO: FlightDTO){
        return this.flightService.create(flightrDTO);
    }

    @Get()
    getAll(){
        return this.flightService.getFlight();
    }

    @Get(':id')
    getFlightById(@Param('id') id: string){
        return this.flightService.getById(id);
    }

    @Put(':id')
    updateFlight(@Param('id')id: string, @Body() flightDto: FlightDTO){
        return this.flightService.updateFlight(id,flightDto);
    }

    @Delete(':id')
    deleteFlight(@Param('id')id: string){
        return this.flightService.delete(id);
    }

    @Post(':flightId/passenger/:passengerId')
    async addPassengerToFlight(@Param('flightId')flightId: string, @Param('passengerId') passengerId: string){
        const passenger = await this.passengerService.getOne(passengerId);
        if(!passenger){
            throw new HttpException('Passenger not found',404);
        }
        return this.flightService.addPassenger(flightId,passengerId);
    }

}
