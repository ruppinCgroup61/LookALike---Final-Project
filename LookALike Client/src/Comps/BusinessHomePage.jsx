import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopupModal from "./PopupsModal";
import "../CSS/BusinessHomePage.css";

const BusinessHomePage = () => {
    const storedFullName = sessionStorage.getItem("fullName");
    const storedEmail = sessionStorage.getItem("email");
    const [fullName, setFullName] = useState("");
    const navigateTo = useNavigate();
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userPopups, setUserPopups] = useState([]);

  useEffect(() => {
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);

  const handleCreatePopup = () => {
    navigateTo("/CreatePopup");
  };

  const handleAddItem = () => {
    fetchUserPopups();
  };

  const handleShowPopups = () => {
    fetchUserPopups();
  };

  const fetchUserPopups = () => {
    fetch(
      `https://localhost:7215/api/PopUp/GetAllPopUpsByEmail/${storedEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUserPopups(data); // Update userPopups state
        setIsModalOpen(true); // Open the modal
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });
  };

    return (
      <div>
        <h3 id="hbusinessaccount">Business account</h3>
        <h2 id="hellobusinessaccount">Hello, {fullName} !</h2>
        <div>
          <button className="popup-buttons" onClick={handleCreatePopup}>
            Create New Popup
          </button>

          <button className="popup-buttons" onClick={handleAddItem}>
            Add New Item
          </button>
          <PopupModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            popups={userPopups}
          />

          <button className="popup-buttons" onClick={handleShowPopups}>
            Show My Popups
          </button>

          <PopupModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            popups={userPopups}
          />
        </div>
      </div>
    );
};

export default BusinessHomePage;
