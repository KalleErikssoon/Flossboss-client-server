import React, { useContext } from "react";
import LoginContainer from '../components/LoginContainer'
import { AppContext } from "../context/AppProvider";
import LogoutButton from "./LogoutButton";


const Home = () => {

    const { showUserModal, setShowUserModal } = useContext(AppContext)


    return (
        <>
            <div style={{ flex: 1 }}>
                <h1>FlossBoss (Home Page)</h1>
                <p>Logged in as: {localStorage.getItem('userIdSession')} </p>
                <button onClick={() => setShowUserModal(prev => !prev)} className="btn btn-primary">
                    Login/Register
                </button>
                <LogoutButton></LogoutButton>
                

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
