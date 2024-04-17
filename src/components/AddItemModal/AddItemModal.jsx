import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [selectedWeather, setSelectedWeather] = useState("");

  const handleRadioChange = (event) => {
    setSelectedWeather(event.target.id);
  };

  const inputClassName = (id) =>
    selectedWeather === id
      ? "modal__radio-inputs_checked"
      : "modal__radio-inputs";

  const labelClassName = (id) =>
    selectedWeather === id
      ? "modal__label modal__label-radio_checked"
      : "modal__label modal__label-radio";

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [link, setLink] = useState("");
  const handleLinkChange = (e) => {
    setLink(e.target.value);
    // console.log(link, e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weather });
  };

  useEffect(() => {
    setName("");
    setLink("");
    setWeather("");
    setSelectedWeather("");
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onAddItem={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          minLength=""
          maxLength="30"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          className="modal__input"
          autoComplete="enabled"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          minLength="2"
          value={link}
          onChange={handleLinkChange}
          id="imageUrl"
          placeholder="Image URL"
          className="modal__input"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="Hot" className={labelClassName("Hot")}>
          <input
            type="radio"
            id="Hot"
            name="weatherType"
            value="hot"
            className={inputClassName("Hot")}
            checked={selectedWeather === "Hot"}
            onChange={(event) => {
              handleRadioChange(event);
              handleWeatherChange(event);
            }}
            required
          />
          Hot
        </label>
        <label htmlFor="Warm" className={labelClassName("Warm")}>
          <input
            type="radio"
            id="Warm"
            name="weatherType"
            value="warm"
            className={inputClassName("Warm")}
            checked={selectedWeather === "Warm"}
            onChange={(event) => {
              handleRadioChange(event);
              handleWeatherChange(event);
            }}
            required
          />
          Warm
        </label>
        <label htmlFor="Cold" className={labelClassName("Cold")}>
          <input
            type="radio"
            id="Cold"
            name="weatherType"
            value="cold"
            className={inputClassName("Cold")}
            checked={selectedWeather === "Cold"}
            onChange={(event) => {
              handleRadioChange(event);
              handleWeatherChange(event);
            }}
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
