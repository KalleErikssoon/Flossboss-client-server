import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/clinicsList.css";
function ClinicsList({ clinics }) {
  const navigate = useNavigate();

  const onBookClick = (name, id) => {
    console.log("abc");
    navigate("/booking", { state: { clinicId: id, clinicName: name } });
  };

  return (
    <ul className="clinics-list">
      {clinics.map((clinicsObj, index) => (
        <li key={index} className="clinic-item">
          <span className="clinic">
            {clinicsObj.name} <br /> {clinicsObj.region} <br />{" "}
            {clinicsObj.address}
          </span>
          {clinicsObj?.slotsAvailable ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                onBookClick(clinicsObj.name, clinicsObj._id);
              }}
            >
              Book
            </button>
          ) : (
            <button type="button" className="btn" disabled aria-disabled="true">
              Unavailable
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
export default ClinicsList;
