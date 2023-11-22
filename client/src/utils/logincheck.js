// src/utils/auth.js

//Utility function that checks if a user is logged in or not by looking at the token
export const loginCheck = () => {
    const token = localStorage.getItem('token');
    return token != null;
  };
  