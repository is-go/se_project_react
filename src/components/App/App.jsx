import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { addItem, deleteItems, getItems } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const handleAddButton = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

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

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutsideModal);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutsideModal);
    };
  }, []);
  const [selectedCard, setSelectedCard] = useState({});
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
    getItems()
      .then((res) => {
        setClothingItems(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // const handleToggleSwitchChange = () => {
  //   if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  //   if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  // };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleDeleteCard = () => {
    deleteItems(selectedCard._id)
      .then(() => {
        const newItemList = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(newItemList);
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddItemSubmit = (values) => {
    addItem(values)
      .then((res) => {
        console.log(res);
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__section">
          <Header onAddButton={handleAddButton} weatherData={weatherData} />
          <Routes>
            <Route
              path="/se_project_react/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/se_project_react/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  handleAddButton={handleAddButton}
                  cards={clothingItems}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          onAddItem={handleAddItemSubmit}
        />
        {selectedCard ? (
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            handleDeleteCard={handleDeleteCard}
          />
        ) : (
          ""
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
