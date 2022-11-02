import React from 'react';

import { 
    Outlet,
    useLocation
} from 'react-router-dom'; 

import {
    Container,
    Row,
    Col,
    Nav
} from 'react-bootstrap';

import { Wrapper } from '@googlemaps/react-wrapper';

// styles
import '../styles.scss';
import './Home.scss';

interface MenuItemProps {
    label: string;
    route: string;
    icon?: string;
}

const MenuItem : React.FC<MenuItemProps> = ({ label, route, icon }) => {
        return (
        <> 
            <Nav.Item style={{textAlign: "left"}}>
                <Nav.Link href={route}> 
                    <i className={icon}/> {label}
                </Nav.Link>
            </Nav.Item>
        </>
    );
};  

interface IHome {
    active?: string;
}

export default function Home() {

    let location = useLocation();

    React.useEffect(() => {

    }, [location]);

    // For example, we only want '/accounts' out of a route such as,
    // '/accounts/<name>' as if we dont define the start of the route,
    // our menu buttons won't be highlighted.
    const leftSideOfPath = `/${location.pathname.split('/', 2)[1]}`;

    // render
    return (
        <Container className="view" fluid>
            <Row>
                <Col className="nav-menu" sm={3}>
                    <h5 className="nav-title">Home</h5>
                    <Nav className="flex-column menu" variant="pills" defaultActiveKey={leftSideOfPath} fill>
                        <span className="link-icon">
                            <MenuItem label="Overview" icon="bi-eye-fill" route="/home"/>
                            <MenuItem label="Drivers" icon="bi-car-front-fill" route="/drivers"/>
                            <MenuItem label="Routes" icon="bi-pin-map-fill" route="/routes"/>
                            <MenuItem label="Deliveries" icon="bi-box-seam-fill" route="/deliveries"/>
                            <MenuItem label="Manage" icon="bi-tools" route="/manage"/>
                        </span>
                    </Nav>
                </Col>
                
                <Col sm={9}>
                    <Wrapper apiKey={`${(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)}`}>
                        <Outlet />
                    </Wrapper>
                </Col>  
            </Row>
            <footer></footer>
        </Container>
    );
};