import React, { useRef, useContext } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import swedishRegions from "../swedishRegions";
import { AppContext } from '../context/AppProvider';
import LoginContainer from './LoginContainer'

const CustomMap = ({ clinics, google, selectedRegion, clinicsAvailable }) => {
  const [activeClinic, setActiveClinic] = React.useState(null);
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const { isLoggedIn, showUserModal, setShowUserModal } = useContext(AppContext);

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
  React.useEffect(() => {
    if (clinicsAvailable && selectedRegion && mapRef.current) {
      const region = swedishRegions.find((r) => r.name === selectedRegion);
      if (region) {
        const { latitude, longitude, zoom } = region;
        mapRef.current.map.panTo({ lat: latitude, lng: longitude });
        mapRef.current.map.setZoom(zoom);
      }
    } else {
      // If the condition is not met, revert back to the initial settings
      mapRef.current.map.panTo({ lat: 63.1282, lng: 18.6435 }); // Sweden's coordinates
      mapRef.current.map.setZoom(5); // Default zoom level
    }
  }, [selectedRegion, clinicsAvailable]);

  const onMarkerClick = (clinic) => {
    setActiveClinic(clinic);
  };

  const onCloseInfoWindow = () => {
    setActiveClinic(null);
  };

  const onBookClick = () => {
    if(isLoggedIn) {
    navigate("/booking", {
      state: { clinicId: activeClinic._id, clinicName: activeClinic.name },
    });
    } else {
      setShowUserModal(true);
    }
  };

  return (
    <>
    <Map
      google={google}
      zoom={5}
      ref={mapRef}
      initialCenter={{
        lat: 63.1282,
        lng: 18.6435, // Sweden's coordinates
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
          <p>
            Opening Hours: {activeClinic?.openFrom} - {activeClinic?.openTo}
          </p>
          <p>Address: {activeClinic?.address}</p>
          {activeClinic?.slotsAvailable ? (
            <button id="bookButton" onClick={onBookClick}>
              Book
            </button>
          ) : (
            <p>No slots available for the next months.</p>
          )}
        </div>
      </InfoWindow>
    </Map>
    {showUserModal && 
    <LoginContainer
    handleClose={() => setShowUserModal(false)}
    visible={showUserModal}
    />}
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
})(CustomMap);
