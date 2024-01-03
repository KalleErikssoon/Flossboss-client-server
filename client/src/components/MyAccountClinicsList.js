import React from "react";
import { Dropdown } from "react-bootstrap";

function MyAccountClinicsList({ clinics, onClinicSelect }) {



    
    return (
        <>
        {clinics.map((clinic, index) => (
            <Dropdown.Item key={index} onClick={() => onClinicSelect(clinic)}>
                {clinic.name}
            </Dropdown.Item>    
        ))}
        </>
    );
}

export default MyAccountClinicsList;