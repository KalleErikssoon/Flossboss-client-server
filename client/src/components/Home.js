import React, { useContext } from "react";
import LoginContainer from "../components/LoginContainer";
import { AppContext } from "../context/AppProvider";
import CustomMap from "../components/CustomMap";

const Home = () => {
  const { showUserModal, setShowUserModal } = useContext(AppContext);

  return (
    <>
      <div style={{ flex: 1 }}>
        <h1>FlossBoss (Home Page)</h1>
        <button
          onClick={() => setShowUserModal((prev) => !prev)}
          className="btn btn-primary"
        >
          Login/Register
        </button>
      </div>
      {showUserModal && (
        <LoginContainer
          handleClose={() => setShowUserModal(false)}
          visible={showUserModal}
        />
      )}
      <CustomMap />
    </>
  );
};

export default Home;
