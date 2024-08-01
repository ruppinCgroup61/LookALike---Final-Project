import React, { useState, useEffect } from "react";
import "../CSS/HomePage.css";
import NaviBarFooter from "../Comps/NaviBarFooter";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function HomePage() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const userEmail = sessionStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = () => {
    fetch("https://localhost:7215/api/User", {
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
        setUserList([...data]);
        const currentUser = data.find((user) => user.email === userEmail);
        setEditedUser(currentUser);
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

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:7215/ws');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const message = event.data;
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
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
      const response = await fetch(`https://localhost:7215/api/User/${userEmail}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      fetchUserDetails(); // Refresh user data
      setShowEditForm(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  let u = "";
  if (userList && userList.length > 0) {
    u = userList.find((user) => user.email === userEmail);
  }

  return (
    <div className="container">
      <div className="top-div">
        <div className="user-circle" onClick={() => setShowPopup(true)}>
          <img src={u.image} alt="User" />
        </div>
        <h1 className="welcome-text">
          Welcome {u.firstName} {u.lastName}
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleNotificationClose}
          >
            {notifications.map((notification, index) => (
              <MenuItem key={index} onClick={handleNotificationClose}>
                {notification}
              </MenuItem>
            ))}
          </Menu>
        </h1>
      </div>
      {showPopup && (
        <div className="popupInHP" style={{
          position: 'absolute',
          // left: 'calc(100% + 10px)',
          top: '160px',
          border: '1px solid grey',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          padding: '10px',
          backgroundColor: 'white',
          zIndex: 1000
        }}>
          <button className="PopUpBtn" onClick={handleLogout}>Log Out</button>
          <button  className="PopUpBtn"onClick={handleEditClick}>Edit User</button>
          <button className="PopUpBtn" onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
      {showEditForm && (
        <div className="edit-form" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '60px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          <input type="email" name="email" className="InputEditUser" value={editedUser.email} disabled placeholder={editedUser.email} />
          <input type="text" name="firstName" className="InputEditUser" onChange={handleInputChange} placeholder={editedUser.firstName} />
          <input type="text" name="lastName" className="InputEditUser" onChange={handleInputChange} placeholder={editedUser.lastName} />
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
          <input type="tel" name="phoneNumber" className="InputEditUser" onChange={handleInputChange} placeholder={editedUser.phoneNumber} />
          <input type="date" name="dateOfBirth" className="InputEditUser" onChange={handleInputChange} placeholder={editedUser.dateOfBirth} />
          <input type="password" name="password" className="InputEditUser" onChange={handleInputChange} placeholder="New Password" />
          <button className="EditUserBtn" onClick={handleSave}>Save</button>
          <button className="EditUserBtn" onClick={() => setShowEditForm(false)}>Cancel</button>
        </div>
      )}
      <div className="center-div">
        <Link to="/MyWardrobe">
          <div className="block">
            <div className="overlay"></div>
            <p className="titleHP">Enter Your Wardrobe</p>
          </div>
        </Link>
        <div className="block">
          <Link to="/UploadItem">
            <div className="overlay"></div>
            <p className="titleHP">Add New Clothing</p>
          </Link>
        </div>
        <div className="block">
          <div className="overlay"></div>
          <p className="titleHP">Enter Social Network</p>
        </div>
        <div className="block">
          <Link to="/HomeLook">
            <div className="overlay"></div>
            <p className="titleHP">Create New Look</p>
          </Link>
        </div>
        <div className="LogoBlock">
          <img src="src/Images/kolav.png" />
        </div>
      </div>
      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </div>
  );
}
