import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  loggedIn,
  handleCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);
  const itemsToDisplay = loggedIn
    ? clothingItems.filter(
        (item) =>
          item.weather === weatherData.type && item.owner === currentUser._id
      )
    : clothingItems;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {itemsToDisplay.map((item) => (
            <ItemCard
              key={`${item._id}-${item.owner}`}
              item={item}
              handleCardClick={() => handleCardClick(item)}
              loggedIn={loggedIn}
              handleCardLike={handleCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
