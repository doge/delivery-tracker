import { IDelivery } from "./Delivery";

export interface IDriver {
    name: string;
    phone_number: string;
    employment_date: Date;
    active: boolean;
    next_stop_index: number; // Used to retreive the next stop from the list of deliveries below
    deliveries: IDelivery[];
    image_url?: string;
};

export class Driver implements IDriver {
    name: string;
    phone_number: string;
    employment_date: Date;
    active: boolean;
    next_stop_index: number;
    deliveries: IDelivery[];
    image_url?: string;

    constructor(name: string, phone_number: string, employment_date: Date, active: boolean, 
        next_stop_index: number, deliveries: IDelivery[], image_url?: string, ) {
            this.name = name;
            this.phone_number = phone_number;
            this.employment_date = employment_date;
            this.active = active;
            this.next_stop_index = next_stop_index;
            this.deliveries = deliveries;
            this.image_url = image_url;

    };
};