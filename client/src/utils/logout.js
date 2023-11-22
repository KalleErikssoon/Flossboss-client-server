export const logout = () => {
    localStorage.removeItem('userIdSession');
    localStorage.removeItem('token'); // Clear other stored tokens if needed
    window.location.href = '/';
};