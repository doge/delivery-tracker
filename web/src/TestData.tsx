// Data used to test various views

import { Driver } from "./models/Driver";
import { Delivery } from "./models/Delivery";

export const deliveries: Delivery[] = [
    new Delivery("Aldway Hayleye", "123 Sesame Street, New York, New York", 0, false, new Date(), "12:30pm"),
    new Delivery("Melinda Beverlye", "123 Sesame Street, New York, New York", 1, false, new Date(), "1:00pm"),
    new Delivery("Alden Elmere", "123 Sesame Street, New York, New York", 2, false, new Date(), "1:30pm"),
    new Delivery("Raylee Fairbairns", "123 Sesame Street, New York, New York", 3, false, new Date(), "2:00pm"),
    new Delivery("Averill Hyland", "123 Sesame Street, New York, New York", 4, false, new Date(), "2:30pm"),
    new Delivery("Faith Hawkinge", "123 Sesame Street, New York, New York", 5, false, new Date(), "3:00pm"),
    new Delivery("Wybert Ackerg", "123 Sesame Street, New York, New York", 6, false, new Date(), "3:30pm"),
    new Delivery("Ela Burns", "123 Sesame Street, New York, New York", 7, false, new Date(), "4:00pm")
];

export const drivers: Driver[] = [
    new Driver("Thistle Radclyffee", "123-456-7890", new Date(), true, 0, deliveries),
    new Driver("Presley Easome", "123-456-7890", new Date(), false, 1, deliveries),
    new Driver("Wystan Beverleye", "123-456-7890", new Date(), false, 2, deliveries),
    new Driver("Cyneric Tatee", "123-456-7890", new Date(), true, 3, deliveries),
    new Driver("Eostre Presleye", "123-456-7890", new Date(), true, 4, deliveries),
    new Driver("Paige Ashe", "123-456-7890", new Date(), false, 5, deliveries),
    new Driver("Hailie Sudworthe", "123-456-7890", new Date(), false, 6, deliveries),
    new Driver("Thornton Woodcocke", "123-456-7890", new Date(), true, 7, deliveries)
];

export const coordinates: {lat: number, lng: number}[] = [
    {
        'lat': 10.27431,
        'lng': -88.66996
    },
    {
        'lat': 19.50816,
        'lng': 36.46638
    },
    {
        'lat': -3.58070,
        'lng': 59.81579
    },
    {
        'lat': -20.60354,
        'lng': -64.23913
    },
    {
        'lat': 31.31956,
        'lng': -49.64331
    },
    {
        'lat': 20.89433,
        'lng': 134.08342
    },
    {
        'lat': -46.11635,
        'lng': -103.47482,
    },
    {
        'lat': 17.03932,
        'lng': -92.72156
    },
    {
        'lat': 31.59968,
        'lng': -52.53806
    },
    {
        'lat': -63.45683,
        'lng': -177.41618
    },
];