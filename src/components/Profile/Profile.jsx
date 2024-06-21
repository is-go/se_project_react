import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/Sidebar";
import "../Profile/Profile.css";

const Profile = ({
  cards,
  handleAddButton,
  handleCardClick,
  handleCardLike,
  setLoggedIn,
  loggedIn,
  handleEditProfileButton,
}) => {
  return (
    <div className="profile">
      <SideBar
        setLoggedIn={setLoggedIn}
        handleEditProfileButton={handleEditProfileButton}
      />
      <ClothesSection
        loggedIn={loggedIn}
        cards={cards}
        handleCardLike={handleCardLike}
        handleCardClick={handleCardClick}
        handleAddButton={handleAddButton}
      />
    </div>
  );
};

export default Profile;
