import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const CustomMap = ({ clinics, google }) => {
  const [activeClinic, setActiveClinic] = React.useState(null);
  const navigate = useNavigate();

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
  // Effect to attach event listener when an InfoWindow is visible
  React.useEffect(() => {
    if (activeClinic) {
      // Wait for the DOM to be updated
      setTimeout(() => {
        const bookButton = document.getElementById("bookButton");
        if (bookButton) {
          bookButton.onclick = onBookClick;
        }
      }, 0);
    }
  });

  const onMarkerClick = (clinic) => {
    setActiveClinic(clinic);
  };

  const onCloseInfoWindow = () => {
    setActiveClinic(null);
  };

  const onBookClick = () => {
    navigate('/booking', { state: { clinicId: activeClinic._id, clinicName: activeClinic.name} }); 
  };

  return (
    <div>
      <button onClick={onBookClick}>Test Book Button</button>
      <Map google={google} zoom={9} initialCenter={{ lat: 57.7289, lng: 11.9746 }}>
        {memoizedMarkers}

        <InfoWindow
          position={
            activeClinic ? { lat: activeClinic.latitude, lng: activeClinic.longitude } : null
          }
          visible={activeClinic != null}
          onClose={onCloseInfoWindow}
        >
          <div>
            <h2>{activeClinic?.name}</h2>
            <p>Opening Hours: {activeClinic?.openingHours}</p>
            {activeClinic?.slotsAvailable ? (
              <button id="bookButton" onClick={onBookClick}>Book</button>
            ) : (
              <p>No slots available for the next months.</p>
            )}
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(CustomMap);
