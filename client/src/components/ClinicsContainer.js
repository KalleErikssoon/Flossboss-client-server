import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import CustomMap from "./CustomMap";
import "../App.css";
import ClinicsList from './ClinicsList'

const ClinicsContainer = () => {
  const [clinics, setClinics] = React.useState([]);

  React.useEffect(() => {
    const fetchClinicsData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clinics");
        const clinicsWithAvailability = await Promise.all(
          response.data.map(async (clinic) => {
            try {
              const availabilityResponse = await axios.get(
                `http://localhost:3000/clinics/appointments/available/${clinic._id}`
              );
              return { ...clinic, slotsAvailable: availabilityResponse.data };
            } catch {
              console.log(
                `No appointment found for the following clinic:  ${clinic._id}`
              );
              // Default to false if the API call for slot availability fails
              return { ...clinic, slotsAvailable: false };
            }
          })
        );
        setClinics(clinicsWithAvailability);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };

    fetchClinicsData();
  }, []);

  return (
    <Container fluid className="p-3">
      {" "}
      {/* Padding on all sides */}
      <Row>
        {/* Clinics List */}
        <Col md={12} xl={6} className="mb-3">
          {" "}
          {/* On small screens, this takes full width and is above the map */}
          {/* Replace this div with your ClinicsList component */}
          <div className="border p-3">
            {" "}
            {/* Placeholder for ClinicsList */}
            <h3>Clinics List</h3>
            <ClinicsList 
            clinics={clinics}
            />
          </div>
        </Col>

        {/* Custom Map */}
        <Col md={12} xl={6} className="mb-3">
          <div className="map-container">
            <CustomMap clinics={clinics} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default ClinicsContainer;
