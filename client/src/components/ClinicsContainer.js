import React from "react";
import axios from "axios";
import CustomMap from "./CustomMap";

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
            } catch (error) {
              console.error(
                `Error checking slots availability for clinic ${clinic._id}:`,
                error
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
    <div>
      <CustomMap clinics={clinics} />
    </div>
  );
};
export default ClinicsContainer;
