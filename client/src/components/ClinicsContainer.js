import React from "react";
import axiosInstance from "../axiosInterceptor";
import { Container, Row, Col } from "react-bootstrap";
import { useCallback } from "react";
import CustomMap from "./CustomMap";
import "../App.css";
import ClinicsList from "./ClinicsList";
import swedishRegions from "../swedishRegions";

const ClinicsContainer = () => {
  const [clinics, setClinics] = React.useState([]);
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");
  const [selectedRegion, setSelectedRegion] = React.useState("");
  const [confirmedRegion, setConfirmedRegion] = React.useState("");
  const [submitClicked, setSubmitClicked] = React.useState(false);

  // This Function will retreive all clinics regardless if they are available or not

  const fetchClinicsData = async (dateFrom, dateTo, shouldFilter, Region) => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/clinics");
      const clinicsWithAvailability = await Promise.all(
        response.data.map(async (clinic) => {
          try {
            const availabilityResponse = await axiosInstance.get(
              `http://localhost:3000/clinics/appointments/available/${clinic._id}?startDate=${dateFrom}&endDate=${dateTo}&region=${Region}`
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

      if (shouldFilter) {
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
    let shouldFilter = false;
    if (!dateFrom && !dateTo && !selectedRegion) {
      errorMessage = "Please enter the filtering fields";
    }

    if ((!dateFrom && dateTo) || (dateFrom && !dateTo)) {
      errorMessage = "Please select both Date From and Date To.";
    } else {
      const from = new Date(dateFrom);
      const to = new Date(dateTo);

      if (to < from) {
        errorMessage = "Date To should be equal to or later than Date From.";
      } else {
        shouldFilter = true;
      }
    }

    if (errorMessage) {
      alert(errorMessage);
      handleReset();
    } else {
      setConfirmedRegion(selectedRegion);
      fetchClinicsData(dateFrom, dateTo, shouldFilter, selectedRegion); // Fetch clinics for the selected date range
    }
    setSubmitClicked(true);
  };
  const handleReset = useCallback(() => {
    // Your existing handleReset logic
    setDateFrom("");
    setDateTo("");
    setSelectedRegion("");
    setConfirmedRegion("");
    console.log(
      "I am selected region",
      selectedRegion,
      "and I am confirmed region",
      confirmedRegion
    );
    fetchClinicsData(null, null, false, ""); // Fetch all clinics without filtering
  }, [selectedRegion, confirmedRegion]);

  const generateDateOptions = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0); // Last day of the next month

    let dates = [];
    for (let d = new Date(); d <= nextMonth; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split("T")[0]); // Format date as 'YYYY-MM-DD'
    }
    return dates;
  };

  React.useEffect(() => {
    let timeoutId;
    if (submitClicked && clinics.length === 0) {
      timeoutId = setTimeout(() => {
        alert("No clinics available.");
        setSubmitClicked(false); // Reset the state after showing the alert
        handleReset();
      }, 1000);
    }

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [clinics, submitClicked, handleReset]);

  return (
    <Container fluid className="p-3">
      <Row>
        <Col xs={12} md={3} className="mb-3 d-flex align-items-end">
          <div>
            <label>Date From: </label>{" "}
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
          </div>
        </Col>

        <Col xs={12} md={3} className="mb-3 d-flex align-items-end">
          <div>
            <label>Date To: </label>{" "}
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
          </div>
        </Col>
        <Col xs={12} md={3} className="mb-3 d-flex align-items-end">
          <div>
            <label>Region: </label>{" "}
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
          </div>
        </Col>
        <Col s={12} md={3} className="mb-3 d-flex align-items-end">
          {" "}
          <div>
            <button onClick={handleSubmit} className="mr-2">
              Submit
            </button>{" "}
            <button onClick={handleReset}>Reset</button>
          </div>
        </Col>

        <Col md={12} xl={6} className="mb-3">
          <div className="border p-3">
            <h3>Clinics List</h3>
            <ClinicsList clinics={clinics} selectedRegion={confirmedRegion} />
          </div>
        </Col>
        <Col md={12} xl={6} className="mb-3">
          <div className="map-container">
            <CustomMap
              clinics={clinics}
              selectedRegion={confirmedRegion}
              clinicsAvailable={clinics.length}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default ClinicsContainer;
