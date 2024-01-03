import axios from 'axios';
//Utility function that handles logging out/updating the amount of logged in users in the database
//Clears the localstorage of the session and token
export const logout = async () => {
    try {
        await axios.put(`http://localhost:3000/users/logout`);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    localStorage.removeItem('userIdSession');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('Email');
    window.location.href = '/';
};