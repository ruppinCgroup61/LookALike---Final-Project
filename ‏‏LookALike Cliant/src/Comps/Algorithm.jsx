import React, { useState, useEffect } from "react";
import "../CSS/Algorithm.css"; // Import the CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import NaviBarFooter from "./NaviBarFooter";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { Link, useNavigate } from "react-router-dom";

const Algorithm = () => {
  const [looks, setLooks] = useState([]);
  const [currentLookIndex, setCurrentLookIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const email = sessionStorage.getItem("email");
  const currentDate = new Date().toISOString(); // Get the current date in ISO format
  const navigate = useNavigate();

  const fetchLooks = async () => {
    try {
      const response = await fetch(
        `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/Algorithm/GetTopThreeLooks?userEmail=${email}&date=${currentDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLooks(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching looks:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchLooks();
      setOpenSnackbar(false);
    }
  }, [email]); // Removed openSnackbar from dependencies to avoid fetching again on snackbar open

  const handleLike = () => {
    if (showPopup1) {
      setShowPopup1(false); // Close pop-up if it's already shown
    } else {
      setIsLiked(true);
      setShowPopup1(true); // Show pop-up on like
    }
  };

  const handleDisLike = () => {
    if (showPopup2) {
      setShowPopup2(false); // Close pop-up if it's already shown
    } else {
      setIsLiked(true);
      setShowPopup2(true); // Show pop-up on like
    }
  };

  const handleTryAgain = async () => {
    if (currentLookIndex < looks.length - 2) {
      setCurrentLookIndex(currentLookIndex + 1);
    } else {
      setCurrentLookIndex(2);
      setSnackbarMessage(`You have reached the limit for now. Try again later`);
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 5000);
    }
  };

  const handlePopup1Close = () => {
    setShowPopup1(false);
  };

  const handlePopup2Close = () => {
    setShowPopup2(false);
  };

  const saveAlgoLook = async () => {
    const outfitToSave = {
      lookId: -1,
      topSelection_ItemId: looks[currentLookIndex]?.topItemID,
      buttomSelection_ItemId: looks[currentLookIndex]?.bottomItemID,
      topSelection_Image: looks[currentLookIndex]?.topImage,
      buttomSelection_Image: looks[currentLookIndex]?.bottomImage,
      createdDate: currentDate,
      calendarDate: "2999-09-19", // Use the current date for calendarDate
      userEmail: email, // Use email instead of userEmail
    };

    console.log("Outfit to save:", outfitToSave);

    try {
      const response = await fetch("https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/ManualLook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(outfitToSave),
      });

      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (response.ok) {
        if (responseText == -1) {
          setSnackbarMessage(`Outfit already exists`);
          setOpenSnackbar(true);
          console.log("Outfit already exists");
        }

        if (responseText == 1) {
          setSnackbarMessage(`Your Outfit was saved successfully`);
          setOpenSnackbar(true);
          console.log("Outfit saved successfully");
          navigate("/HomeLook");
        }
      } else {
        console.log("Failed to save outfit:");
      }
    } catch (error) {
      console.error("Error saving outfit:", error);
    }
  };

  const currentLook = looks[currentLookIndex];

  const handleSaveToCalendar = () => {
    const selectedLook = looks[currentLookIndex];
    navigate("/algorithm-calendar", {
      state: { selectedLook },
    });
  };

  return (
    <div className="algorithm-container">
      <div className="Upload_Header3">
        <Link to="/HomeLook">
          <button className="PUup-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </Link>
        <h1 className="LogoFont3">LookALike</h1>
      </div>
      <div className="AlgoHeader">
        {/* <button
          onClick={() => {
            navigate("/HomeLook");
          }}
          className="Algo-Back-Button"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button> */}
        <h1>YOUR OUTFIT IS READY!</h1>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
        >
          <SnackbarContent
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
              border: "1px solid #d2d2d2",
              textAlign: "center",
              fontFamily: "Urbanist, sans-serif",
              fontSize: "20px",
              color: "#333",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            message={snackbarMessage}
          />
        </Snackbar>
      </div>
      {currentLook && (
        <div className="algorithm-look-container">
          <div className="algorithm-image-container">
            <img
              src={currentLook.topImage}
              alt={currentLook.topName}
              className="algorithm-top-image"
            />
            <div className="algorithm-image-name">{currentLook.topName}</div>
          </div>
          <div className="algorithm-image-container">
            <img
              src={currentLook.bottomImage}
              alt={currentLook.bottomName}
              className="algorithm-bottom-image"
            />
            <div className="algorithm-image-name">{currentLook.bottomName}</div>
          </div>
        </div>
      )}
      <button className="algorithm-like-button" onClick={handleLike}>
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      {showPopup1 && (
        <div className="popupAlgo">
          <button
            className="popup-close-buttonAlgo"
            onClick={handlePopup1Close}
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "30px",
              color: "#000",
            }}
          >
            ×
          </button>
          <div className="algorithm-action-buttons">
            <button
              className="algorithm-save-calendar-button"
              onClick={handleSaveToCalendar}
            >
              Save to calendar
            </button>
            <button
              className="algorithm-save-look-button"
              onClick={saveAlgoLook}
            >
              Save look
            </button>
          </div>
        </div>
      )}
      <button className="algorithm-like-button" onClick={handleDisLike}>
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>
      {showPopup2 && (
        <div className="popupAlgo">
          <button
            className="popup-close-buttonAlgo"
            onClick={handlePopup2Close}
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "30px",
              color: "#000",
            }}
          >
            ×
          </button>
          <div className="algorithm-action-buttons">
            <button
              className="algorithm-try-again-button"
              onClick={handleTryAgain}
              disabled={currentLookIndex >= 2}
            >
              Try again
            </button>
          </div>
        </div>
      )}

      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </div>
  );
};

export default Algorithm;
