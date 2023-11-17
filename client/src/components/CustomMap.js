import React from "react";
import axios from "axios";

import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
const MapContainer = (props) => {
  const [clinics, setClinics] = React.useState([]);

  React.useEffect(() => {
    async function getAllClinics() {
      const response = await axios.get("http://localhost:3000/clinics");
      setClinics(response.data);
    }
    getAllClinics();
  }, []);
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
      {clinics.map((clinic) => (
        <Marker
          key={clinic._id} // Make sure each clinic has a unique id
          position={{ lat: clinic.latitude, lng: clinic.longitude }}
          title={clinic.name}
        />
      ))}
    </Map>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyB7MUqT1Pord-sdxh1DHIyeJwUagiMowyU",
})(MapContainer);
