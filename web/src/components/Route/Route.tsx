import { IDelivery } from '../Drivers/Driver'

interface Route extends IDelivery {
    region: string;
    stops: IDelivery[];
};

class Route implements IDelivery {
    region: string;
    stops: IDelivery[];

    constructor(region: string, stops: IDelivery[]) {
        this.region = region
        this.stops = stops
    }
};