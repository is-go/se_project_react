import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import likedIcon from "../../assets/liked-button.svg";
import unlikedIcon from "../../assets/unliked-button.svg";

function ItemCard({ item, handleCardClick, loggedIn, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked =
    Array.isArray(item.likes) &&
    item.likes.some((id) => id === currentUser._id);

  return (
    <li className="card">
      <div className="card__name-cont">
        <h2 className="card__name">{item.name}</h2>
        {loggedIn && (
          <button
            className="card__like"
            onClick={() => handleCardLike(item._id, isLiked)}
          >
            <img
              src={isLiked ? likedIcon : unlikedIcon}
              alt="like button"
              className="card__like-img"
            />
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__img"
      />
    </li>
  );
}
//  return (

export default ItemCard;
