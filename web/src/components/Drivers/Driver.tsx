import React from 'react';
import { Card, Col, Row, Container, Badge, Button } from 'react-bootstrap';

import './Driver.scss';

/*
    When storing data, we have to outline what data we need in order to have our application to function.

    In the case of our drivers, we are going to need their;

    name: string            // their names
    image_url: string       // the url to their profile picture
    active: boolean         // if they're on an active job
    next_stop: number       // their next stop they are going to

        name: string;
    image_url: string;
    employment_date: Date;
    active: boolean;
    deliveries: IDelivery[];

    In the case of deliveries we're going to need;



*/

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
    next_stop_index: number;             // Used to retreive the next stop from the list of deliveries below
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

const DriverCard : React.FC<IDriver> = ({name, phone_number, employment_date, active, 
    next_stop_index, deliveries, image_url}) => {
    return (
        <>
            <Container className="driver-view flex-wrap">
                <Card className="">
                    <Row>
                        <Col sm={3}>
                            <Card.Img className="driver-card" 
                            src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"/>
                        </Col>
                        <Col sm={9}>
                            <Card.Body >

                                <Card.Title>
                                    { name }
                                </Card.Title>

                                <Card.Subtitle style={{fontWeight: 300, fontSize: ".9rem"}} >
                                    {active && (
                                        <Badge bg="success" pill={true}>Online</Badge>
                                    )}
                                    {!active && (
                                        <Badge bg="danger" pill={true}>Offline</Badge>
                                    )}
                                </Card.Subtitle>

                                <Card.Body style={{paddingLeft: 0, paddingRight: 0}}>
                                <Row>
                                    <Col sm={6} style={{height: "11rem",}}>
                                        <Card style={{height: "inherit"}}>
                                            <Card.Header>Options</Card.Header>
                                            <Button style={{margin: "2rem"}}>Create Route</Button>
                                        </Card>
                                    </Col>
                                    <Col sm={6} style={{height: "11xrem", paddingRight: 22}}>
                                        <Card style={{height: "inherit"}}>
                                            <Card.Header>Contact Information</Card.Header>
                                            <Card.Body>
                                                <p>{phone_number}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                </Card.Body>
                            </Card.Body>
                            

                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    );
};

export default DriverCard;

//bg?: Variant;
//pill?: boolean;
//text?: Color;
