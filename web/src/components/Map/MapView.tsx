import React from 'react';

import '../Map/Map.scss';

import {
    Container,
    DropdownButton,
    ButtonGroup,
    Dropdown,
    Spinner,
    Button,
    Card,
    Row,
    Col,
    Form
} from 'react-bootstrap';

import {
    GoogleMap,
    useJsApiLoader,
    MarkerF,
    InfoWindowF
} from '@react-google-maps/api';

import MarkerView from '../Marker/MarkerView';

import { 
    drivers,
    coordinates
} from '../../TestData';

import { IDriver } from '../Drivers/Driver';

export default function MapView() {

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    }) 

    // Map starting position
    const [ center, setCenter ] = React.useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0
    });

    const [ clicks, setClicks ] = React.useState<google.maps.LatLng[]>([]);
    const [ zoom, setZoom ] = React.useState(12); // initial zoom
    const [ map, setMap ] = React.useState<google.maps.Map>();
    const [ loadedLocation, setLoadedLocation ] = React.useState(false);
    const [ activeMarker, setActiveMarker ] = React.useState<number>();

    React.useEffect(() => {
        // Let's check if geolocation is enabled
        if(navigator.geolocation && !loadedLocation) {
            // If it is, let's get the users current position
            navigator.geolocation.getCurrentPosition((position) => {
                // Then, let's set the center of the map to their latitude/longitude
                setCenter({
                    lat: position.coords.latitude, 
                    lng: position.coords.longitude
                });
                setLoadedLocation(true);

                console.log("Current position found and loaded!");
            }, (error) => {
                console.log(error);
            }, {enableHighAccuracy: true, timeout: 5000, maximumAge: 0});
        }
    }, []);

    // Let's make sure the API has loaded first,
    if(!isLoaded) { 
        return <Spinner animation="border"/>
    } else if(loadError) {
        return <Container>MapView could not be rendered</Container>
    }

    // Testing custom icons...
    const iconAttributes = {
        url: "https://www.freeiconspng.com/thumbs/car-icon-png/car-icon-png-25.png",
        scaledSize: new google.maps.Size(25, 25),
        style: { position: "absolute" }
    } as google.maps.Icon;
    
    // Event handlers
    const markerOnClick = (marker: number) => {
        if(marker != activeMarker) { 
            setActiveMarker(marker);
        }
    }

    const mapOnClick = (e: google.maps.MapMouseEvent) => {
        setClicks([...clicks, e.latLng!]);  
    };
  
    const mapOnIdle = () => {
        if(map) {
            setZoom(map.getZoom()!);
            setCenter(map.getCenter()!.toJSON());
        }
    };

    return (
        <div className="map">
            <Container className="map-view">

                <DropdownButton
                    as={ButtonGroup}
                    key="up"
                    drop="up"
                    id="dropdown-button-drop-up"
                    variant="primary"
                    title="+"
                    className="map-dropdown-btn">
                        
                    <Dropdown.Item as="button">Add Marker</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => {
                        setLoadedLocation(false);
                        setZoom(12);
                    }}>Recenter View</Dropdown.Item>
                    <Dropdown.Divider/> 
                    <Dropdown.Item as="button">Create New Route</Dropdown.Item>
                </DropdownButton>

                    <div className="map-controls">
                        <Card style={{ width: '24rem'}}>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col lg={8} sm={8} xs={8} >
                                            <Form.Control></Form.Control>
                                        </Col>
                                        <Col>
                                            <Button variant="primary" style={{width: '100%'}} onClick={() => {
                                                console.log("click");
                                            }}>Add Stop</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
            </Container>

            <GoogleMap
                center={center}
                onClick={mapOnClick}
                onIdle={mapOnIdle}
                onLoad={(map) => {
                    setMap(map);
                }}
                zoom={zoom}
                mapContainerStyle={{
                    width: "100%",
                    height: "100%"
                }}
                options={{
                    mapTypeControl: false,
                    fullscreenControl: false,
                    streetViewControl: false
                }}>
                    
                {drivers.map((driver: IDriver, index) => {
                    // Let's render our driver positions,
                    return(
                        <MarkerF 
                            position={coordinates[index]}
                            icon={iconAttributes}
                            onClick={ () => markerOnClick(index) }
                        >
                        {activeMarker === index ? (
                            <InfoWindowF onCloseClick={() => setActiveMarker(-1)}>
                                { MarkerView(driver) }
                            </InfoWindowF>
                        ) : null}
                        </MarkerF>
                        
                    );
                })}

            </GoogleMap>
        </div>
    );
};