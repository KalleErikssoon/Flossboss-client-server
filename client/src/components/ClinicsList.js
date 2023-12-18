import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../context/AppProvider';
import "../styles/clinicsList.css";
import LoginContainer from './LoginContainer'

function ClinicsList({ clinics, selectedRegion }) {
  const navigate = useNavigate();
  const { isLoggedIn, showUserModal, setShowUserModal } = useContext(AppContext);

  const onBookClick = (name, id) => {
    if(isLoggedIn) {
    navigate("/booking", { state: { clinicId: id, clinicName: name } });
    } else {
      setShowUserModal(true);
    }
  };

  return (
    <>
    <ul className="clinics-list">
      {clinics.map((clinic, index) => (
        <li key={index} className="clinic-item">
          <span className="clinic">
            <strong>Name:</strong> {clinic.name} <br />
            {selectedRegion ? (
              <>
                <strong>Address:</strong> {clinic.address} <br />
                <strong>Zipcode:</strong> {clinic.zipcode}
              </>
            ) : (
              <>
                <strong>Region:</strong> {clinic.region} <br />
                <strong>Zipcode:</strong> {clinic.zipcode}
              </>
            )}
          </span>
          {clinic?.slotsAvailable ? (
            <button
              className="btn btn-primary"
              onClick={() => onBookClick(clinic.name, clinic._id)}
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
    {showUserModal && 
    <LoginContainer
    handleClose={() => setShowUserModal(false)}
    visible={showUserModal}
    />}
    </>
  );
}
export default ClinicsList;
