import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopupModal from "./PopupsModal";
import "../CSS/BusinessHomePage.css";
import { IoLogOutOutline } from "react-icons/io5";

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

  const handleLogOut = () => {
    sessionStorage.clear();
  };

  const handleCreatePopup = () => {
    navigateTo("/CreatePopup");
  };

  const handleAddItem = () => {
    sessionStorage.setItem("from", "addnewitem");
    fetchUserPopups();
  };

  const handleShowPopups = () => {
    sessionStorage.setItem("from", "showmypopups");
    fetchUserPopups();
  };

  const fetchUserPopups = () => {
    fetch(
      `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/PopUp/GetAllPopUpsByEmail/${storedEmail}`,
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
      <div id="businessHP">
        <Link to="/cgroup61/test2/tar3/">
            <IoLogOutOutline id="options_dots" onClick={handleLogOut}/>
        </Link>
        <img style={{ width: 60 }} src="https://i.imgur.com/mMRaL3f.png" alt="lookalike" />
        <img
          style={{ width: 280, marginBottom: 50 }}
          src="https://i.imgur.com/X5SKuNv.png"
          alt="lookalike"
        />
      </div>
      <div id="businessHP2">
        <h3 id="hbusinessaccount">Business account</h3>
        <h2 id="hellobusinessaccount">Hello, {fullName} !</h2>
      </div>
      <div id="businessHPbuttons">
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
