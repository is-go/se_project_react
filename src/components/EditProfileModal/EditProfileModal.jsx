import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import { useContext } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, closeActiveModal, handleEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAvatar = (e) => {
    setAvatar(e.target.value);
  };

  function handleEditSubmit(e) {
    e.preventDefault();
    handleEditProfile({ name, avatar });
  }

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      buttonText="Save Changes"
      handleSubmit={handleEditSubmit}
    >
      <div className="modal__edit-inputs">
        <label className="modal__form-label">
          Name *
          <input
            type="text"
            className="modal__form-input modal__form-edit-input"
            name="name"
            value={name}
            onChange={handleName}
            required
            placeholder="Name"
          />
        </label>
        <label className="modal__form-label">
          Avatar *
          <input
            className="modal__form-input modal__form-edit-input"
            placeholder="Avatar"
            type="url"
            value={avatar}
            onChange={handleAvatar}
            required
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
