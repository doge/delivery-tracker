import React from 'react';

// styles
import '../styles.scss';
import './Home.scss';

import { 
    NavLink,
    Outlet,
    useLocation
} from 'react-router-dom'; 

import {
    Container,
    Row,
    Col,
    Nav
} from 'react-bootstrap';

interface MenuItemProps {
    label: string;
    route: string;
    icon?: string;
}

const MenuItem : React.FC<MenuItemProps> = (props: MenuItemProps) => {
        return (
            <NavLink 
                to={ props.route }
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"} > 
                <i className={ props.icon }/> { props.label }
            </NavLink>
    );
};  

export default function Home() {

    let location = useLocation();
    React.useEffect(() => { }, [location]);

    // For example, we only want '/accounts' out of a route such as,
    // '/accounts/<name>'. If we dont define the start of the route,
    // and set it as the defaultActiveKey, our menu buttons won't be
    // highlighted.
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
                    <Outlet />
                </Col>

            </Row>
        </Container>
    );
};