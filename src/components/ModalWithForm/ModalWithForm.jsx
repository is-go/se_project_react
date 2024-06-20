import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  closeActiveModal,
  onAddItem,
  otherModal,
  spanText,
  handleSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <form action="#" className="modal__form" onSubmit={onAddItem}>
          <h2 className="modal__title">{title}</h2>
          <button
            onClick={closeActiveModal}
            type="button"
            className="modal__close"
          ></button>
          {children}
          <div className="modal__button-cont">
            <button
              type="submit"
              className="modal__submit"
              onClick={handleSubmit}
              // disabled
            >
              {buttonText}
            </button>
            <button
              type="button"
              className="modal__other-button"
              onClick={otherModal}
            >
              {spanText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
