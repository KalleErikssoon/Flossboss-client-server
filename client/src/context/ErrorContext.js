// ErrorContext.js
import React, { createContext, useState, useContext } from "react";

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const triggerError = (errorStatus, navigate) => {
    setHasError(errorStatus);
    if (errorStatus && navigate) {
      navigate("/error"); // Navigate to the error page
    }
  };

  return (
    <ErrorContext.Provider value={{ hasError, triggerError }}>
      {children}
    </ErrorContext.Provider>
  );
};
