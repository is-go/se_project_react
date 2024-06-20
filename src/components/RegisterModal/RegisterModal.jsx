import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const RegisterModal = ({
  isOpen,
  closeActiveModal,
  handleSignUp,
  handleLoginButton,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUrlChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };


  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    handleSignUp({ email, password, name, avatar });
    closeActiveModal();
  }

  return (
    <ModalWithForm
      title="Sign Up"
      closeActiveModal={closeActiveModal}
      handleSubmit={handleSubmit}
      buttonText="Next"
      isOpen={isOpen}
      otherModal={handleLoginButton}
      spanText="Or Log In"
    >
      <label className="modal__label">
        Email
        <input
          type="text"
          name="email"
          minLength="1"
          maxLength="30"
          placeholder="Email"
          className="modal__input"
          onChange={handleEmailChange}
          value={email}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="text"
          name="password"
          minLength="1"
          maxLength="30"
          placeholder="Password"
          className="modal__input"
          onChange={handlePasswordChange}
          value={password}
          required
        />
      </label>
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          className="modal__input"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>
      <label className="modal__label">
        Avatar
        <input
          type="url"
          minLength="1"
          placeholder="Avatar URL"
          className="modal__input"
          onChange={handleUrlChange}
          value={avatar}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;