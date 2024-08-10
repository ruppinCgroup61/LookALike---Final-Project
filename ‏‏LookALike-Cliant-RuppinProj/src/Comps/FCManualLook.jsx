import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiTShirtThin, PiPantsThin } from "react-icons/pi";
import { CiSquarePlus } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineSaveAlt } from "react-icons/md";
import "../CSS/ManualLook.css";
import NaviBarFooter from "./NaviBarFooter";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

const FCManualLook = (props) => {
  const { selectedTop, selectedBottom, setSelectedTop, setSelectedBottom } =
    props;
  const userEmail = sessionStorage.getItem("email");
  const navigate = useNavigate();
  const [showAlert1, setAlert1] = useState(false);
  const [showAlert2, setAlert2] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  console.log("Props received:", { selectedTop, selectedBottom });

  useEffect(() => {
    let timer;
    if (openSnackbar) {
      timer = setTimeout(() => {
        setOpenSnackbar(false);
        setSelectedTop(null);
        setSelectedBottom(null);
        navigate("/HomeLook");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [openSnackbar, navigate]);

  const saveLook = async () => {
    
    const outfitToSave = {
      lookId: -1,
      topSelection_ItemId: selectedTop.item_ID,
      buttomSelection_ItemId: selectedBottom.item_ID,
      topSelection_Image: selectedTop.image,
      buttomSelection_Image: selectedBottom.image,
      createdDate: new Date().toISOString(),
      calendarDate: '1800-01-01',
      userEmail: userEmail,
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
          setAlert2(true);
          console.log("Outfit already exists");
        }

        if (responseText == 1) {
          setSnackbarMessage(`Your Outfit was saved successfully`);
          setOpenSnackbar(true);
          console.log("Outfit saved successfully");
        }
      } else {
        console.log(
          "Failed to save outfit:",
          response.status,
          response.statusText,
          responseText
        );
        alert("Failed to save outfit");
      }
    } catch (error) {
      console.error("Error saving outfit:", error);
      alert("Error saving outfit");
    }
  };

  return (
    <>
      <div className="app-container">
        <div className="Upload_Header3">
          <Link to="/HomeLook">
            <button className="PUup-button">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </Link>
          <h1 className="LogoFont3">LookALike</h1>
        </div>
        <h2 className="manual_h2">Build Your New Outfit</h2>
        <div className="icon-section">
          <div className="icon-container">
            <Link to="/select-top">
              {selectedTop ? (
                <img
                  src={selectedTop.image}
                  alt={selectedTop.name}
                  className="icon"
                />
              ) : (
                <CiSquarePlus
                  className="icon-button"
                  onClick={() => 
                    setSelectedTop(/* ערך חדש של selectedTop */)}
                />
              )}
              {!selectedTop && <PiTShirtThin className="icon" />}
            </Link>
          </div>
          <div className="icon-container">
            <Link to="/select-bottom">
              {selectedBottom ? (
                <img
                  src={selectedBottom.image}
                  alt={selectedBottom.name}
                  className="icon"
                />
              ) : (
                <CiSquarePlus
                  className="icon-button"
                  onClick={() =>
                    setSelectedBottom(/* ערך חדש של selectedBottom */)
                  }
                />
              )}
              {!selectedBottom && <PiPantsThin className="icon" />}
            </Link>
          </div>
        </div>

        <div className="ADD_Look">
          {selectedTop && selectedBottom ? (
            <div>
              <Link to="/calendar">
                <button className="btn_manual_look">
                  <h5>
                    <IoCalendarClearOutline className="icon_ML" /> Save to
                    Calendar
                  </h5>
                </button>
              </Link>
              <button className="btn_manual_look" onClick={saveLook}>
                <h5>
                  <MdOutlineSaveAlt className="icon_ML" /> Save Look
                </h5>
              </button>
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
              <Stack
                sx={{
                  position: "fixed",
                  top: "50%",
                }}
                spacing={2}
              >
                {showAlert2 && (
                  <Alert severity="error" onClose={() => setAlert2(false)}>
                    <AlertTitle>save failed</AlertTitle>
                    This look already exists
                  </Alert>
                )}
              </Stack>
            </div>
          ) : (
            <div>
              <button className="btn_no_manual_look">Save to Calendar</button>
              <button className="btn_no_manual_look">Save Look</button>
            </div>
          )}
        </div>
        <div className="bottom-div">
          <NaviBarFooter />
        </div>
      </div>
    </>
  );
};

export default FCManualLook;
