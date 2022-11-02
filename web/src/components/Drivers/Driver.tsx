import './Driver.scss';

export interface ICustomer {
    name: string;
    address: string;
    phone_number: string;
    notes: string;
};

export interface IDelivery {
    customer: string;
    address: string;
    stop_index: number; // What's the index of their next stop?
    delivered?: boolean|false;
    delivery_date?: Date|null;
    delivery_time?: string|null;
};

export class Delivery implements IDelivery {
    customer: string;
    address: string;
    stop_index: number;
    delivered?: boolean|false;
    delivery_date?: Date|null;
    delivery_time?: string|null;

    constructor(customer: string, address: string, stop_index:number, 
        delivered?: boolean, delivery_date?: Date, delivery_time?:string) {
        this.customer = customer;
        this.address = address;
        this.stop_index = stop_index;
        this.delivered = delivered;
        this.delivery_date = delivery_date;
        this.delivery_time = delivery_time;

    };
};

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