import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
const MapContainer = (props) => {
  return (
    <Map
      google={props.google}
      style={{ width: "60%", height: "60%" }}
      zoom={11}
      initialCenter={{
        lat: 57.7089,
        lng: 11.9746,
      }}
    />
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyB7MUqT1Pord-sdxh1DHIyeJwUagiMowyU",
})(MapContainer);
