import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const LoginModal = ({
  closeActiveModal,
  isOpen,
  handleLogin,
  handleSignUpButton,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ email, password });
    closeActiveModal();
  }

  return (
    <ModalWithForm
      title="Login"
      closeActiveModal={closeActiveModal}
      handleSubmit={handleSubmit}
      buttonText="Log In"
      isOpen={isOpen}
      spanText="Or Sign Up"
      otherModal={handleSignUpButton}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          value={email}
          minLength="1"
          maxLength="30"
          placeholder="Email"
          className="modal__input"
          onChange={handleEmailChange}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="text"
          name="password"
          value={password}
          minLength="1"
          maxLength="30"
          placeholder="Password"
          className="modal__input"
          onChange={handlePasswordChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;