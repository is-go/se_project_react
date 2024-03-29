import ClothingSection from "../ClothingSection/ClothingSection";
import Sidebar from "../Sidebar/Sidebar";
import "../Profile/Profile.css";

const Profile = ({ cards, handleAddButton, handleCardClick }) => {
  return (
    <div className="profile">
      <Sidebar />
      <ClothingSection
        cards={cards}
        handleCardClick={handleCardClick}
        handleAddButton={handleAddButton}
      />
    </div>
  );
};

export default Profile;
