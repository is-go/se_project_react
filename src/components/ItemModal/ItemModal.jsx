import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({
  isOpen,
  card,
  closeActiveModal,
  handleDeleteButton,
  loggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = loggedIn && currentUser && currentUser._id;
  const isOwner = isLoggedIn && card.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete ${isOwner && isOpen ? "modal__delete_visible" : ""}`;

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
          src={card.imageUrl}
          alt={card.name}
        />
        <div className="modal__footer">
          <span>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </span>
          <button
            type="button"
            className={itemDeleteButtonClassName}
            onClick={handleDeleteButton}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
