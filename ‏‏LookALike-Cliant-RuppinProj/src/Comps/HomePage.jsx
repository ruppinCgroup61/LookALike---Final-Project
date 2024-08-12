import React, { useState, useEffect } from "react";
import "../CSS/HomePage.css";
import NaviBarFooter from "../Comps/NaviBarFooter";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const userEmail = sessionStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = () => {
    fetch(`https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/User/ReadUserByMail${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setEditedUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/cgroup61/test2/tar3/");
  };

  const handleEditClick = () => {
    setShowPopup(false);
    setShowEditForm(true);
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/User/${userEmail}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      fetchUserDetails(); // Refresh user data
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (!user) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className="container">
      <div className="top-div">
        <div className="user-circle" onClick={() => setShowPopup(true)}>
          <img src={user.image} alt="User" />
        </div>
        <h1 className="welcome-text">
          Welcome {user.firstName} {user.lastName}
        </h1>
      </div>
      {showPopup && (
        <div className="popupInHP" style={{
          position: "absolute",
          // left: 'calc(100% + 10px)',
          top: "170px",
          border: "1px solid grey",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          padding: "10px",
          // backgroundColor: "rgb(238, 232, 230)",
          background: "linear-gradient(#eeee, #ffff)",
          // backgroundImage: "linear-gradient(to left, #c1b1a7 0%, #c39b8b 51%, #b89587 100%)",
          zIndex: 1000,
        }}>
          <button className="picPopUpBtn" onClick={handleLogout}>
            Log out
          </button>
          <button className="picPopUpBtn" onClick={handleEditClick}>
            Edit user
          </button>
          <IoCloseOutline className="ClosepicPopUpBtn" onClick={() => setShowPopup(false)} />
        </div>
      )}
      {showEditForm && (
        <div className="edit-form" style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "linear-gradient(#eeee, #ffff)",
          padding: "15px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}>
          <h2>Update User Details:</h2>
          <input
            type="email"
            name="email"
            className="InputEditUser"
            value={editedUser.email}
            disabled
            placeholder={editedUser.email}
          />
          <input
            type="text"
            name="firstName"
            className="InputEditUser"
            onChange={handleInputChange}
            placeholder={editedUser.firstName}
          />
          <input
            type="text"
            name="lastName"
            className="InputEditUser"
            onChange={handleInputChange}
            placeholder={editedUser.lastName}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="InputEditUser"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setEditedUser({ ...editedUser, image: reader.result });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <input
            type="tel"
            name="phoneNumber"
            className="InputEditUser"
            onChange={handleInputChange}
            placeholder={editedUser.phoneNumber}
          />
          <input
            type="date"
            name="dateOfBirth"
            className="InputEditUser"
            onChange={handleInputChange}
            placeholder={editedUser.dateOfBirth}
          />
          <input
            type="password"
            name="password"
            className="InputEditUser"
            onChange={handleInputChange}
            placeholder="New Password"
          />
          <button className="EditUserBtn" onClick={handleSave}>
            Save
          </button>
          <button
            className="EditUserBtn"
            onClick={() => setShowEditForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
      <div className="center-div">
        <Link to="/MyWardrobe">
          <div className="block" id="b_one">
            <div className="overlay"></div>
            <p className="titleHP">Enter Your Wardrobe</p>
          </div>
        </Link>

        <Link to="/UploadItem">
          <div className="block" id="b_two">
            <div className="overlay"></div>
            <p className="titleHP">Add New Clothing</p>
          </div>
        </Link>

        <Link to="/SocialNetwork">
          <div className="block" id="b_three">
            <div className="overlay"></div>
            <p className="titleHP">Enter Social Network</p>
          </div>
        </Link>

        <Link to="/HomeLook">
          <div className="block" id="b_four">
            <div className="overlay"></div>
            <p className="titleHP">Create New Look</p>
          </div>
        </Link>

        <div className="LogoBlock">
          <img src="https://i.imgur.com/mMRaL3f.png" />
        </div>
      </div>
      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </div>
  );
}
