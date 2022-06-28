import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PASSENGER } from 'src/common/models/models';
import { IPassenger } from '../common/interfaces/passenger.interface';
import { PassengerDTO } from './dto/passenger.dto';

@Injectable()
export class PassengerService {

    constructor(@InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>){}

    async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
        const newPassenger = new this.model({ ...passengerDTO });
        return await newPassenger.save();
    }

    async getPassenger(): Promise<IPassenger[]> {
        return await this.model.find();
    }


    async getOne(id: string): Promise<IPassenger> {
        return await this.model.findById(id).exec();
    }

    async update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger> {
        const passenger = {...passengerDTO}
        return await this.model.findByIdAndUpdate(id,passenger,{new : true});
    }


    async delete(id: string){
        await this.model.findByIdAndDelete(id);
        return { status: HttpStatus.OK , msg: 'deleted' }
    }

}


