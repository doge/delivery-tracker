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
    InfoWindowF,
    DirectionsRenderer,
    PolylineF
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

    // State
    const [ clicks, setClicks ] = React.useState<google.maps.LatLng[]>([]);
    const [ zoom, setZoom ] = React.useState(12); // initial zoom
    const [ map, setMap ] = React.useState<google.maps.Map>();
    const [ loadedLocation, setLoadedLocation ] = React.useState(false);
    const [ activeMarker, setActiveMarker ] = React.useState<number>();
    const [ route, setRoute ] = React.useState<any>();

    const origin = React.useRef(null);
    const destination = React.useRef(null);

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
                console.error(error);
            }, {enableHighAccuracy: true, timeout: 5000, maximumAge: 0});
        }
    }, []);

    // Let's make sure the API has loaded first,
    if(!isLoaded) { 
        return <Spinner animation="border"/>
    } else if(loadError) {
        return <Container>MapView could not be rendered</Container>
    }

    function calculateDirections(origin: string, destination:string, waypoints?: []) {
        // Calculate the directions from the Maps api

        const directionsService = new google.maps.DirectionsService();
        directionsService.route({
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
            if(result) {
                if(status == google.maps.DirectionsStatus.OK) {
                    setRoute(result);
                }
            } else {
                console.error(result);
            }
        });
    }

    function clearDirections() {
        setRoute(null);
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
                        <Card style={{ width: 'auto'}}>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col lg={4} sm={4} xs={4} >
                                            <Form.Control placeholder="Origin" ref={origin} />
                                        </Col>
                                        <Col lg={4} sm={4} xs={4} >
                                            <Form.Control placeholder="Destination" ref={destination} />
                                        </Col>  
                                        <Col lg={4} sm={4} xs={4}>
                                            <Button variant="primary" style={{width: '100%'}} onClick={() => {

                                                // Make sure our variables are reset
                                                clearDirections();
                                                
                                                // Check the user filled out the text boxes
                                                if(origin.current && destination.current) {
                                                    const originValue = origin.current['value'];
                                                    const destinationValue = destination.current['value'];

                                                    if(!originValue || !destinationValue) {
                                                        console.log("origin & destination not supplied");
                                                        return;
                                                    }

                                                    calculateDirections(originValue, destinationValue);
                                                }

                                            }}>Route</Button>
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


            {route && <PolylineF 
                        path={ route.routes[0].overview_path }
                        options={{
                            strokeColor: "blue",
                            strokeOpacity: 1.0,
                            strokeWeight: 5
                        }}/>}

            </GoogleMap>
        </div>
    );
};