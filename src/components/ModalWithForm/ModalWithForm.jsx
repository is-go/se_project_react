import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  closeActiveModal,
  onAddItem,
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
          <button
            type="submit"
            className="modal__submit  "
            // disabled
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
