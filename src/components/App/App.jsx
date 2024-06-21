import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { ProtectedRoute } from "../ProtectedRoute/ProtectrdRoute";
import Profile from "../Profile/Profile";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  addItem,
  deleteItems,
  getItems,
  addLike,
  removeLike,
} from "../../utils/api";
import * as auth from "../../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleAddButton = () => setActiveModal("add-garment");
  const handleSignUpButton = () => setActiveModal("signup");
  const handleLoginButton = () => setActiveModal("login");
  const handleEditProfileButton = () => setActiveModal("edit");
  const handleDeleteButton = () => setActiveModal("delete");
  const closeActiveModal = () => setActiveModal("");

  const handleSignUp = ({ email, password, name, avatar }) => {
    auth
      .signUp({ email, password, name, avatar })
      .then(() => {
        return auth.signIn({ email, password });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        getUserData();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    auth
      .signIn({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        getUserData();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    auth
      .editProfile({ name, avatar }, token)
      .then((res) => {
        setCurrentUser(res);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const getUserData = () => {
    const token = localStorage.getItem("jwt");
    auth
      .checkToken(token)
      .then((res) => {
        setCurrentUser(res.user);
        setLoggedIn(true);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoggedInLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setCurrentUser(res.user);
          setLoggedIn(true);
        })
        .catch(console.error)
        .finally(() => {
          setIsLoggedInLoading(false);
        });
    } else {
      setIsLoggedInLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleClickOutsideModal = (event) => {
      if (event.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutsideModal);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutsideModal);
    };
  }, [activeModal]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("jwt");
      getItems(token)
        .then((res) => {
          setClothingItems(res);
        })
        .catch(console.error);
    } else {
      setClothingItems(defaultClothingItems);
    }
  }, [loggedIn]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const handleDeleteCard = () => {
    const token = localStorage.getItem("jwt");
    deleteItems(selectedCard._id, token)
      .then(() => {
        const newItemList = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingItems(newItemList);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddItemSubmit = (values) => {
    const token = localStorage.getItem("jwt");
    addItem(values, token)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      addLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch(console.error);
    } else {
      removeLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch(console.error);
    }
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__section">
            <Header
              handleAddButton={handleAddButton}
              weatherData={weatherData}
              handleLoginButton={handleLoginButton}
              handleSignUpButton={handleSignUpButton}
              isLoggedIn={loggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    loggedIn={loggedIn}
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    isLoggedInLoading={isLoggedInLoading}
                  >
                    <Profile
                      loggedIn={loggedIn}
                      setLoggedIn={setLoggedIn}
                      handleAddButton={handleAddButton}
                      handleEditProfileButton={handleEditProfileButton}
                      cards={clothingItems}
                      handleCardClick={handleCardClick}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeActiveModal}
            onAddItem={handleAddItemSubmit}
          />
          {selectedCard ? (
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              closeActiveModal={closeActiveModal}
              onDelete={handleDeleteButton}
              loggedIn={loggedIn}
            />
          ) : (
            ""
          )}
          <RegisterModal
            isOpen={activeModal === "signup"}
            closeActiveModal={closeActiveModal}
            handleSignUp={handleSignUp}
            handleLoginButton={handleLoginButton}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            closeActiveModal={closeActiveModal}
            handleLogin={handleLogin}
            handleSignUpButton={handleSignUpButton}
          />
          <EditProfileModal
            isOpen={activeModal === "edit"}
            closeActiveModal={closeActiveModal}
            handleEditProfile={handleEditProfile}
          />
          <ConfirmationModal
            isOpen={activeModal === "delete"}
            closeActiveModal={closeActiveModal}
            handleConfirm={handleDeleteCard}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
