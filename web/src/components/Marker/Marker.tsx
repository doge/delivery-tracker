import React from "react";

interface IMarker extends google.maps.MarkerOptions {
  content?: string;
  onClick?(): void;
}

const Marker: React.FC<IMarker> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // Setup the popup
    const infoWindow = new google.maps.InfoWindow({
      content: options.content,
      minWidth: 500
    });

    // Let's check if we clicked the marker
    marker?.addListener("click", (event: any) => {

      // Check if the optional variables are defined
      if (typeof options.onClick !== "undefined") {
        options.onClick();
      }
      
      if (typeof options.content !== "undefined") {
        // Render the popup
        infoWindow.open(marker.getMap(), marker);
      }
    });

    // Remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);


  return null;
};

export default Marker;