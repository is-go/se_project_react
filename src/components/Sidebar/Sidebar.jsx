import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Sidebar.css";

const SideBar = ({ handleEditProfileButton, setLoggedIn }) => {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sidebar">
      <div className="sidebar__cont">
        <img
          src={currentUser.avatar}
          alt="current user's avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__name">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons ">
        <button
          type="text"
          className="sidebar__button"
          onClick={handleEditProfileButton}
        >
          Change profile data
        </button>
        <button
          type="text"
          className="sidebar__button"
          onClick={() => {
            navigate("/");
            setLoggedIn(false);
            localStorage.removeItem("jwt");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
