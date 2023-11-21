import React from "react";
import axios from "axios";
import CustomMap from "./CustomMap";

const ClinicsContainer = () => {
  const [clinics, setClinics] = React.useState([]);

  React.useEffect(() => {
    let isComponentMounted = true; // Flag to track component mount status

    async function getAllClinics() {
      try {
        const response = await axios.get("http://localhost:3000/clinics");
        if (isComponentMounted) {
          setClinics(response.data);
        }
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    }

    getAllClinics();

    // Cleanup function
    return () => {
      isComponentMounted = false;
    };
  }, []);
  console.log(clinics);

  return (
    <div>
      <CustomMap clinics={clinics} />
    </div>
  );
};
export default ClinicsContainer;
