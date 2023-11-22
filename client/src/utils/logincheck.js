// src/utils/auth.js
export const loginCheck = () => {
    const token = localStorage.getItem('token');
    return token != null;
  };
  