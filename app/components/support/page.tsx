import UserSupportComponent from "./UserSupportComponent";
import "./UserSupportComponent.css"; // Import the CSS for styling

const SupportPage = () => {
  return (
    <div className="support-page">
      <h1>User Support</h1>
      <UserSupportComponent /> {/* Renders the user chat component */}
    </div>
  );
};

export default SupportPage;
