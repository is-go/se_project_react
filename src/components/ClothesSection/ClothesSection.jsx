import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothingSection = ({ cards, handleCardClick, handleAddButton }) => {
  return (
    <div className="clothes__section">
      <div className="clothes__section-items">
        <p className="clothes__title">Your items</p>
        <button
          className="clothes__button"
          onClick={handleAddButton}
          type="text"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes__items">
        {cards.map((card) => {
          return (
            <ItemCard
              key={card._id}
              item={card}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothingSection;
