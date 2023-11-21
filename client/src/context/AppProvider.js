import React, { useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [showUserModal,setShowUserModal] = useState(false);
    const [user, setUser] = useState(null); //state that manages user data;

    const login = userData => {
        setUser(userData);  //function that updates user data on login
    };

    const logout = () => {
        setUser(null); //function to clear user data on logout
    };

    return (
        <AppContext.Provider
            value={{
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
