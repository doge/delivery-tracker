import React from 'react';

// map components
import Map from './Map';
import Marker from '../Marker/Marker';
import MarkerView from '../Marker/MarkerView'

import { IDriver } from '../Drivers/Driver';
import { drivers, deliveries, coordinates } from '../../TestData';

interface IMapView {
    className?: string;
};

export default function MapView({className}: IMapView) {

    // Setup maps variables
    const ref = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<google.maps.Map>();

    // Map starting position
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0
    });

    // Setup the Map
    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    // Testing icons...
    const iconAttributes = {
        url: "https://www.freeiconspng.com/thumbs/car-icon-png/car-icon-png-25.png",
        scaledSize: new google.maps.Size(25, 25),
        style: {position: "absolute"}
    
    } as google.maps.Icon;
    
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(12); // initial zoom

    const onClick = (e: google.maps.MapMouseEvent) => {
        setClicks([...clicks, e.latLng!]);
    };
  
    const onIdle = (m: google.maps.Map) => {
        setZoom(m.getZoom()!);
        setCenter(m.getCenter()!.toJSON());
    };

    const [loadedLocation, setLoadedLocation ] = React.useState(false);

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

    return (
        <div className={className}>
            <Map
                center={center}
                onClick={onClick}
                onIdle={onIdle}
                zoom={zoom}
                mapTypeControl={false}
                fullscreenControl={false}
                streetViewControl={false}
            >
                {drivers.map((driver: IDriver, index) => {
                    return(
                        <Marker 
                        position={coordinates[index]}
                        icon={iconAttributes}
                        content={MarkerView(driver)}
                        />
                    );
                })}
            </Map>
        </div>
    );  
};