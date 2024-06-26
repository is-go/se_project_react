import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({
  cards,
  handleCardClick,
  handleAddButton,
  loggedIn,
  handleCardLike,
}) => {
  const itemsToDisplay = cards;
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
        {itemsToDisplay.map((item) => (
          <ItemCard
            key={`${item._id}`}
            item={item}
            handleCardClick={() => handleCardClick(item)}
            loggedIn={loggedIn}
            handleCardLike={handleCardLike}
          />
        ))}
      </ul>
    </div>
  );
};

export default ClothesSection;
