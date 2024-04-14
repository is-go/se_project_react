import "./ItemModal.css";

function ItemModal({ isOpen, card, closeActiveModal, handleDeleteCard }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type-image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close modal__close_preview"
        ></button>
        <img
          className="modal__image  modal__image_preview"
          src={card.link}
          alt={card.name}
        />
        <div className="modal__footer">
          <span>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </span>
          <button
            type="delete"
            className="modal__delete"
            onClick={handleDeleteCard}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
