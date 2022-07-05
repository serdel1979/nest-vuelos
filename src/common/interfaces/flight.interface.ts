import { IPassenger } from "./passenger.interface";

export interface IFlight extends Document{
    pilot: string;
    airplane:string;
    destinationCity:string;
    flightDtae:Date;
    passengers: IPassenger[]
}