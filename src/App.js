import React, { useState, useEffect } from "react";

// import logo from "./logo.svg";
import "./App.css";
import GoogleMapReact from "google-map-react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
function SimpleMap() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((currentLocation) => {
      const { latitude: lat, longitude: lng } = currentLocation.coords;
      setLocation({ lat, lng });
    });
  };

  return (
    <div className="map-container">
      <Button
        className="location-button"
        variant="dark"
        onClick={setCurrentLocation}
      >
        click here to check your location !
      </Button>
      <GoogleMapReact center={location} defaultZoom={11}>
        {!!location.lat && !!location.lng && (
          <MarkerWithInfoWindow lat={location.lat} lng={location.lng} />
        )}
      </GoogleMapReact>
    </div>
  );
}

const MarkerWithInfoWindow = ({ position }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((state) => !state);
  return (
    <div onClick={toggle} position={position} title="You're here">
      {!!isOpen && (
        <Badge className="badge" bg="black">
          You're Here!!
        </Badge>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="currentColor"
        class="bi bi-geo-alt-fill"
        viewBox="0 0 16 16"
      >
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
      </svg>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <SimpleMap />
    </div>
  );
}
export default App;
