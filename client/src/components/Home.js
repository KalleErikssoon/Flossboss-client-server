import React, { useContext } from "react";
import LoginContainer from '../components/LoginContainer'
import { AppContext } from "../context/AppProvider";

const Home = () => {

    const { showUserModal, setShowUserModal } = useContext(AppContext)

    return (
        <>
            <div style={{ flex: 1 }}>
                <h1>FlossBoss (Home Page under construction)</h1>
                <button onClick={() => setShowUserModal(prev => !prev)} className="btn btn-primary">
                    Login/Register
                </button>
            </div>
            {showUserModal && (
                <LoginContainer
                    handleClose={() => setShowUserModal(false)}
                    visible={showUserModal}
                />
            )}
        </>
    );
};

export default Home;
