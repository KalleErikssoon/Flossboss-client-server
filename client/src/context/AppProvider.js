import React, { useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [showUserModal,setShowUserModal] = useState(false)

    return (
        <AppContext.Provider
            value={{
                showUserModal,
                setShowUserModal
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
