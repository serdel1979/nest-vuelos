import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { FlightDTO } from './dto/flight.dto';
import { PassengerDTO } from '../passenger/dto/passenger.dto';

@Injectable()
export class FlightService {


    constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>) { }

    async create(flightDTO: FlightDTO): Promise<IFlight> {
        const newPassenger = new this.model({ ...flightDTO });
        return await newPassenger.save();
    }

    async getFlight(): Promise<IFlight[]> {
        return await this.model.find();
    }

    async getById(id: string): Promise<IFlight> {
        return await this.model.findOne({ _id: id }).exec();
    }

    async updateFlight(id: string, flightDto: FlightDTO): Promise<IFlight> {
        const flight = { ...flightDto }
        return await this.model.findByIdAndUpdate(id, flight, { new: true });
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        return { status: HttpStatus.OK, msg: 'Flight deleted' }
    }


    async addPassenger(idFlight: string, passengerId: string): Promise<IFlight> {
        return await this.model.findByIdAndUpdate(idFlight, {
            $addToSet: {
                passengers: passengerId
            }
        }, { new: true }).populate('passengers');
    }

}
