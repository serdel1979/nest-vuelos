import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { FlightDTO } from './dto/flight.dto';

@Injectable()
export class FlightService {


    constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>){}

    async create(flightDTO: FlightDTO): Promise<IFlight> {
        const newPassenger = new this.model({ ...flightDTO });
        return await newPassenger.save();
    }

    async getFlight(): Promise<IFlight[]> {
        return await this.model.find();
    }

}
