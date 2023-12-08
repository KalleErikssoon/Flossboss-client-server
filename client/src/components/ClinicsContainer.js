import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import CustomMap from "./CustomMap";
import "../App.css";
import ClinicsList from "./ClinicsList";
import swedishRegions from "../swedishRegions";

const ClinicsContainer = () => {
  const [clinics, setClinics] = React.useState([]);
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");
  const [selectedRegion, setSelectedRegion] = React.useState("");

  // This Function will retreive all clinics regardless if they are available or not

  const fetchClinicsData = async (
    dateFrom,
    dateTo,
    shouldFilterByDate,
    selectedRegion
  ) => {
    try {
      const response = await axios.get("http://localhost:3000/clinics");
      const clinicsWithAvailability = await Promise.all(
        response.data.map(async (clinic) => {
          try {
            const availabilityResponse = await axios.get(
              `http://localhost:3000/clinics/appointments/available/${clinic._id}?startDate=${dateFrom}&endDate=${dateTo}&region=${selectedRegion}`
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

      if (shouldFilterByDate) {
        const availableClinics = clinicsWithAvailability.filter(
          (clinic) => clinic.slotsAvailable
        );
        setClinics(availableClinics);
      } else {
        setClinics(clinicsWithAvailability);
      }
    } catch (error) {
      console.error("Error fetching clinics:", error);
    }
  };

  React.useEffect(() => {
    fetchClinicsData(null, null, false, "");
  }, []); // This runs only once when the component mounts

  const handleSubmit = () => {
    let errorMessage = "";
    let shouldFilterByDate = false;

    if ((!dateFrom && dateTo) || (dateFrom && !dateTo)) {
      errorMessage = "Please select both Date From and Date To.";
    } else {
      const from = new Date(dateFrom);
      const to = new Date(dateTo);

      if (to < from) {
        errorMessage = "Date To should be equal to or later than Date From.";
      } else {
        shouldFilterByDate = true;
      }
    }

    if (errorMessage) {
      alert(errorMessage);
      handleReset();
    } else {
      fetchClinicsData(dateFrom, dateTo, shouldFilterByDate, selectedRegion); // Fetch clinics for the selected date range
    }
  };
  const handleReset = () => {
    setDateFrom("");
    setDateTo("");
    setSelectedRegion("");
    fetchClinicsData(null, null, false, ""); // Fetch all clinics without filtering
  };

  const generateDateOptions = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0); // Last day of the next month

    let dates = [];
    for (let d = new Date(); d <= nextMonth; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split("T")[0]); // Format date as 'YYYY-MM-DD'
    }
    return dates;
  };

  return (
    <Container fluid className="p-3">
      <Row>
        <Col md={12} className="mb-3">
          <div>
            <label>Date From: </label>
            <select
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            >
              <option value="" disabled>
                Select From
              </option>
              {generateDateOptions().map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>

            <label>Date To: </label>
            <select value={dateTo} onChange={(e) => setDateTo(e.target.value)}>
              <option value="" disabled>
                Select To
              </option>
              {generateDateOptions().map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <label>Region: </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="" disabled>
                Select Region
              </option>
              {swedishRegions.map((region, index) => (
                <option key={index} value={region.name}>
                  {region.name}
                </option>
              ))}
            </select>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </Col>
        <Col md={12} xl={6} className="mb-3">
          <div className="border p-3">
            <h3>Clinics List</h3>
            <ClinicsList clinics={clinics} />
          </div>
        </Col>
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
