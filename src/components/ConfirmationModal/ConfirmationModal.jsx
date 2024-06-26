import "./ConfrimationModal.css";

function ConfirmationModal({ isOpen, closeActiveModal, handleDeleteCard, card }) {
console.log(card);
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content-confirm">
        <p className="modal__title modal__confirm-title">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__title modal__confirm-title">
          This action is irreversible.
        </p>
        <div className="modal__buttons">
          <button
            type="button"
            className="modal__confirm-button"
            onClick={() => handleDeleteCard(card)}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="modal__cancel-button"
            onClick={closeActiveModal}
          >
            Cancel
          </button>
          <button
            onClick={closeActiveModal}
            type="button"
            className="modal__close"
          />
        </div>
      </div>
    </div>
  );
}
export default ConfirmationModal;
