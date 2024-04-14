import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "../Profile/Profile.css";

const Profile = ({ cards, handleAddButton, handleCardClick }) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        cards={cards}
        handleCardClick={handleCardClick}
        handleAddButton={handleAddButton}
      />
    </div>
  );
};

export default Profile;
