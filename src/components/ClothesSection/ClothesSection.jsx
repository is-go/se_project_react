import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({
  cards,
  handleCardClick,
  handleAddButton,
  loggedIn,
  handleCardLike,
}) => {
  return (
    <div className="clothes__section">
      <div className="clothes__section-items">
        <p className="clothes__title">Your items</p>
        <button
          className="clothes__button"
          onClick={handleAddButton}
          type="button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes__items">
        {cards.map((card) => (
          <ItemCard
            key={card._id}
            item={card}
            handleCardClick={() => handleCardClick(card)}
            loggedIn={loggedIn}
            handleCardLike={handleCardLike}
          />
        ))}
      </ul>
    </div>
  );
};

export default ClothesSection;
