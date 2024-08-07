import React, { useState, useEffect } from "react";
import NaviBarFooter from "./NaviBarFooter";
import { IoPeopleSharp, IoShirtSharp } from "react-icons/io5";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import "../CSS/SocialNetwork.css";

export default function SocialNetwork() {
  const [open, setOpen] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [followers, setFollowers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [validEmail, setValidEmail] = useState(false);
  const [likedItems, setLikedItems] = useState([]);
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem("email");
  const [DatafromUsers, setDatafromUsers] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:7215/api/UserFollower/followers/${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFollowers(
          data.filter((follower) => follower.follower_Email === userEmail)
        );
      })
      .catch((error) => {
        console.error("Error fetching followers:", error);
      });

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
        setUserList(data);
        setDatafromUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    fetch(
      `https://localhost:7215/api/Algorithm/GetAllLikedItems?AdminUserMail=${userEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        setLikedItems(data);
      })
      .catch((error) => {
        console.error("Error fetching liked items:", error);
      });
  }, [userEmail]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddFriend = () => {
    const UserFollower = {
      Follower_Email: userEmail,
      Following_Email: friendEmail,
    };
    fetch("https://localhost:7215/api/UserFollower", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserFollower),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Catch Error");
        }
        return response.json();
      })
      .then((data) => {
        if (data === 1) {
          setSnackbarMessage(`Friend added successfully`);
        }
        if (data === 0) {
          setSnackbarMessage(`Friend already exists`);
        }
        if (data === -1) {
          setSnackbarMessage(`Email does not exist in the system`);
        }
        setOpenSnackbar(true);
        setTimeout(() => {
          setOpenSnackbar(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error during add new friend:", error);
      });
    handleClose();
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setFriendEmail(email);
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    setValidEmail(isValidEmail);
  };

  const countEntriesForFriendCloset = async (adminUserMail, closetMail) => {
    try {
      const response = await fetch(
        `https://localhost:7215/api/Algorithm/AddOrUpdateEntry?adminUserMail=${adminUserMail}&closetMail=${closetMail}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update entry count");
      }

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error("Error counting entries:", error);
    }
  };

  const goToFollowerCloset = (email) => {
    countEntriesForFriendCloset(userEmail, email); // Call the function to update entry count
    const user = userList.find((user) => user.email === email);
    if (user) {
      navigate(`/follower-closet/${email}`, {
        state: { fullName: `${user.firstName} ${user.lastName}` },
      });
    }
  };

  const getUserImage = (email) => {
    const user = userList.find((user) => user.email === email);
    return user ? user.image : "default-image-path"; // Default image path if user or image not found
  };

  const getUserFullName = (email) => {
    const user = userList.find((user) => user.email === email);
    return user ? `${user.firstName} ${user.lastName}` : "Unknown User";
  };

  if (!DatafromUsers) {
    return (
      <div className="loading-container">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  const getRandomFriends = () => {
    if (followers.length <= 2) return followers;
    const randomFriends = [];
    while (randomFriends.length < 2) {
      const randomIndex = Math.floor(Math.random() * followers.length);
      if (!randomFriends.includes(followers[randomIndex])) {
        randomFriends.push(followers[randomIndex]);
      }
    }
    return randomFriends;
  };

  const displayedFriends = getRandomFriends();

  return (
    <div className="SN_Container">
      <div className="SN_Header">
        <h2 className="HeaderSocial">Social Network</h2>
        <IoPeopleSharp className="header-icon" />
      </div>
      <div className="SN_Center">
        <div className="add-friend" onClick={handleClickOpen}>
          <IoShirtSharp className="wardrobe-icon" />
          <span>Add New Friend</span>
        </div>
        <div className="followers-slider">
          <h2 className="H2inSN">Enter Friend Wardrobe:</h2>
          <div className="follower-cards">
            {displayedFriends.length === 0 ? (
              <p>You have not added friends yet</p>
            ) : (
              displayedFriends.map((follower, index) => (
                <div
                  key={index}
                  className="follower-card"
                  onClick={() => goToFollowerCloset(follower.following_Email)}
                >
                  <img
                    src={getUserImage(follower.following_Email)}
                    alt={`Profile of ${follower.userYouFollow_Full_Name}`}
                    className="follower-image"
                  />
                  <span>@{follower.userYouFollow_Full_Name}</span>
                </div>
              ))
            )}
          </div>

          <button
            className="next-button"
            onClick={() => navigate("/all-friends")}
          >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </button>
        </div>
        <div id="liked-items-slider">
          <h2 id="H2inSN">Liked Items:</h2>
          <Carousel indicators={false} interval={null}>
            {likedItems.length > 0 ? (
              likedItems
                .reduce((acc, item, index) => {
                  const slideIndex = Math.floor(index / 2);
                  if (!acc[slideIndex]) acc[slideIndex] = [];
                  acc[slideIndex].push(item);
                  return acc;
                }, [])
                .map((slideItems, slideIndex) => (
                  <Carousel.Item key={slideIndex}>
                    <div className="d-flex justify-content-center2">
                      {slideItems.map((item, itemIndex) => (
                        <div key={itemIndex} className="liked-item mx-2">
                          <img
                            src={item.itemImage}
                            alt={`Item ${item.itemName}`}
                            className="liked-item-image"
                          />
                          <span className="liked-item-name">
                            {item.itemName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Carousel.Item>
                ))
            ) : (
              <Carousel.Item>
                <div className="d-flex justify-content-center2">
                  <p>There are no liked items yet</p>
                </div>
              </Carousel.Item>
            )}
          </Carousel>
        </div>
      </div>
      <NaviBarFooter />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Friend</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="friendEmail"
            label="Friend Email"
            type="email"
            fullWidth
            value={friendEmail}
            onChange={handleEmailChange}
            error={!validEmail && friendEmail.length > 0}
            helperText={
              !validEmail && friendEmail.length > 0
                ? "Invalid email address"
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddFriend}
            color="primary"
            disabled={!validEmail}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <SnackbarContent message={snackbarMessage} />
      </Snackbar>
    </div>
  );
}
