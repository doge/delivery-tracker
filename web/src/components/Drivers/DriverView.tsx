import { 
    Container,
    Row
} from 'react-bootstrap';

import './Driver.scss';
import DriverCard, { IDriver } from './Driver'

// Test data
import { drivers } from '../../TestData';

export default function DriverView() {

    return (
        <>  
            <Container className="driver-container">
                <Row>

                        {drivers.map(({ name, phone_number, employment_date, active, 
                        next_stop_index, deliveries, image_url }: IDriver, index) => {
                            return (
                                <DriverCard 
                                    name={name}
                                    phone_number={phone_number}
                                    image_url={image_url}
                                    employment_date={employment_date}
                                    active={active}
                                    next_stop_index={next_stop_index}
                                    deliveries={deliveries}
                                    key={index}
                                />
                            );
                        })}

                </Row>
            </Container>

        </>
    );
};