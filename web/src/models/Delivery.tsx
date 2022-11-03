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