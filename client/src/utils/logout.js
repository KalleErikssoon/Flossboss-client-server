
//Utility function that handles logging out
//Clears the localstorage of the session and token
export const logout = () => {
    localStorage.removeItem('userIdSession');
    localStorage.removeItem('token'); // Clear other stored tokens if needed
    window.location.href = '/';
};