import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
const CustomMap = ({ clinics, google }) => {
  const [activeClinic, setActiveClinic] = React.useState(null);

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
      google={google}
      style={{ width: "60%", height: "60%" }}
      zoom={9}
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
          {activeClinic?.slotsAvailable ? (
            <button>Book</button>
          ) : (
            <p>No slots available for the next months.</p>
          )}
        </div>
      </InfoWindow>
    </Map>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyB7MUqT1Pord-sdxh1DHIyeJwUagiMowyU",
})(CustomMap);
