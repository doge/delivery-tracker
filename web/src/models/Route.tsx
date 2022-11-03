import { IDelivery } from './Delivery'

// ** Todo **
// Implement route finder

interface IRoute {
    region: string;
    stops: IDelivery[];
};

export class Route implements IRoute {
    region: string;
    stops: IDelivery[];

    constructor(region: string, stops: IDelivery[]) {
        this.region = region
        this.stops = stops
    }

    addDelivery(stop: IDelivery) {
        this.stops.push(stop);
    }

    removeDelivery(stop: IDelivery) {
        this.stops.splice(this.stops.indexOf(stop), 1);
    }

    clearDeliveries() {
        this.stops = new Array<IDelivery>();
    }
};