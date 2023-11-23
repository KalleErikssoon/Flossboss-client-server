import React, { useState, useEffect } from "react";
import { loginCheck } from '../utils/logincheck'; // Import your utility function


const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [showUserModal,setShowUserModal] = useState(false);
    const [user, setUser] = useState(null); //state that manages user data;
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const login = userData => {
        setUser(userData);  //function that updates user data on login
    };

    const logout = () => {
        setUser(null); //function to clear user data on logout
    };

    useEffect(() => {
        setIsLoggedIn(loginCheck()); // Update the state based on the utility function
      }, []);

    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                showUserModal,
                setShowUserModal,
                user,
                login,
                logout
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
export { AppContext, AppProvider };
