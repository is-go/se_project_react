import { Link } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import defaultAvatar from "../../assets/default-avatar.svg";

function Header({ onAddButton, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          <img src={logo} alt="" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__user-container ">
        <ToggleSwitch />
        <button onClick={onAddButton} className="header__add-clothes-button">
          + Add Clothes
        </button>
        <Link to="/profile" className="header__username">
          Terrence Tegegne
        </Link>

        {avatar ? (
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        ) : (
          <img
            src={defaultAvatar}
            alt="Default Avatar"
            className="header__avatar"
          />
        )}
      </div>
    </header>
  );
}

export default Header;
