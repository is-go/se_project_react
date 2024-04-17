import React, { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  // console.log(weatherData); Keeping here to check condition
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.find((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (!filteredOptions) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions;
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}&deg;
        {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Image showing ${weatherData.isDay ? "day" : "night"}time with ${
          weatherData.condition
        }`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
