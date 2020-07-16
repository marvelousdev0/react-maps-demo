import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";
import "mapbox-gl/dist/mapbox-gl.css";

const { REACT_APP_MAPBOX_API_KEY = "" } = process.env;
mapboxgl.accessToken = REACT_APP_MAPBOX_API_KEY;

const defaultLocation = {
  lat: 30.263497,
  lng: -81.530425,
  zoom: 16,
};

const MapContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: Nunito;
`;

type MapBoxProps = {
  currentTheme: string;
};

const MapBox: React.FunctionComponent<MapBoxProps> = ({ currentTheme }) => {
  const mapContainerRef = useRef(null);
  const style = `mapbox://styles/mapbox/${
    currentTheme === "light" ? "streets-v11" : "dark-v10"
  }`;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current || "",
      style: style,
      center: [defaultLocation.lng, defaultLocation.lat],
      zoom: defaultLocation.zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    return () => map.remove();
  }, [style]);

  return <MapContainer ref={mapContainerRef} />;
};

export default MapBox;
