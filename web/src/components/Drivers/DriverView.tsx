import { 
    Container,
    Row,
    Table
} from 'react-bootstrap';

import './Driver.scss';
import { IDriver } from './Driver'

// Test data
import { drivers } from '../../TestData';

export default function DriverView() {

    // render
    return (
        <>  
            <Container className="driver-container">
                <Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Active</th>
                                <th>Next Stop</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drivers.map((driver: IDriver, index) => {
                                return (
                                    <tr>
                                        <td>{driver.name}</td>
                                        <td>{driver.phone_number}</td>
                                        <td>{String(driver.active)}</td>
                                        <td>{driver.deliveries[driver.next_stop_index].address}</td>
                                        <td>{driver.next_stop_index + 1} / {driver.deliveries.length}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Container>

        </>
    );
};