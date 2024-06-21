import "./Header.css";
import avatar from "../../assets/avatar.svg";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const Header = ({
  handleAddButton,
  handleSignUpButton,
  handleLoginButton,
  isLoggedIn,
  weatherData,
}) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__user-container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddButton}
              className="header__add-clothes-button"
            >
              + Add New Clothes
            </button>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "black" }}
              className="header__username"
            >
              {currentUser?.name}
            </Link>
            <img
              src={currentUser?.avatar || avatar}
              alt={currentUser?.name || "Default Avatar"}
              className="header__avatar"
            />
          </>
        ) : (
          <>
            <button
              onClick={handleSignUpButton}
              type="text"
              className="header__button"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginButton}
              type="text"
              className="header__button"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
