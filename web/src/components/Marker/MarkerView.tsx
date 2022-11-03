import { IDriver } from '../Drivers/Driver';

import { 
    Container,
    Card,
    Badge,
    ListGroup,
    ListGroupItem,
    Button
} from 'react-bootstrap';

import { renderToStaticMarkup } from 'react-dom/server';

import './Marker.scss';

export default function MarkerView(driver: IDriver) {
    return (
        <>
            <Container className="marker-container">
                <Card className="marker-card">
                    <Card.Header>{driver.name}</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <Badge className="marker-status-badge" bg="success">Active</Badge>
                        </Card.Title>
                        <ListGroup>
                            <ListGroupItem>
                                Deliveries remaining: <Badge bg="primary">{driver.deliveries.length - driver.next_stop_index}</Badge>
                            </ListGroupItem>
                            <ListGroupItem>
                                Next stop: <Badge bg="primary">{driver.deliveries[driver.next_stop_index].address}</Badge>
                            </ListGroupItem>
                            <ListGroupItem>
                                Phone number: <Badge bg="primary">{driver.phone_number}</Badge>
                            </ListGroupItem>
                        </ListGroup>
                        <Button variant="primary" className="marker-full-width-btn">
                            View Route
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};