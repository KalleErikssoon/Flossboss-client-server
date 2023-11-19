import React from "react";
import axios from "axios";

import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
const MapContainer = (props) => {
  const [clinics, setClinics] = React.useState([]);
  const [activeClinic, setActiveClinic] = React.useState(null);

  React.useEffect(() => {
    let isComponentMounted = true; // Flag to track component mount status

    async function getAllClinics() {
      try {
        const response = await axios.get("http://localhost:3000/clinics");
        if (isComponentMounted) {
          setClinics(response.data);
        }
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    }

    getAllClinics();

    // Cleanup function
    return () => {
      isComponentMounted = false;
    };
  }, []);

  // Memoizing markers to prevent recalculating on every render(Avoid refreashing the markers for each render)
  const memoizedMarkers = React.useMemo(() => {
    return clinics.map((clinic) => (
      <Marker
        key={clinic._id}
        onClick={() => onMarkerClick(clinic)}
        position={{ lat: clinic.latitude, lng: clinic.longitude }}
        title={clinic.name}
      />
    ));
  }, [clinics]);

  const onMarkerClick = (clinic) => {
    setActiveClinic(clinic);
  };

  const onCloseInfoWindow = () => {
    setActiveClinic(null);
  };

  return (
    <Map
      google={props.google}
      style={{ width: "60%", height: "60%" }}
      zoom={10}
      initialCenter={{
        lat: 57.7089,
        lng: 11.9746,
      }}
    >
      {memoizedMarkers}

      <InfoWindow
        position={
          activeClinic
            ? { lat: activeClinic.latitude, lng: activeClinic.longitude }
            : null
        }
        visible={activeClinic != null}
        onClose={onCloseInfoWindow}
      >
        <div>
          <h2>{activeClinic?.name}</h2>
          <p>Opening Hours: {activeClinic?.openingHours}</p>
        </div>
      </InfoWindow>
    </Map>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyB7MUqT1Pord-sdxh1DHIyeJwUagiMowyU",
})(MapContainer);
