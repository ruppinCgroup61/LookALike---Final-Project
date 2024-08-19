import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../CSS/Calendar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import NaviBarFooter from "./NaviBarFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const AlgorithmCalendarPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedLook } = location.state || {};
  const [date, setDate] = useState(new Date());
  const userEmail = sessionStorage.getItem("email");

  const [showAlert, setShowAlert] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    let timer;
    if (openSnackbar) {
      timer = setTimeout(() => {
        setOpenSnackbar(false);
        navigate("/HomeLook");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [openSnackbar, navigate]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddToCalendar = async () => {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const timezoneOffset = selectedDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(selectedDate.getTime() - timezoneOffset);

    const outfit = {
      lookId: -1,
      topSelection_ItemId: selectedLook.topItemID,
      buttomSelection_ItemId: selectedLook.bottomItemID,
      topSelection_Image: selectedLook.topImage,
      buttomSelection_Image: selectedLook.bottomImage,
      createdDate: new Date().toISOString(),
      calendarDate: adjustedDate.toISOString(),
      userEmail: userEmail,
      source: "algorithm"
    };

    try {
      const response = await fetch("https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/ManualLook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(outfit),
      });

      const responseText = await response.text();

      if (response.ok) {
        if (responseText === "1") {
          setSnackbarMessage(`The look was added successfully!`);
          setOpenSnackbar(true);
        } else if (responseText === "-1") {
          setShowAlert(true);
          console.log("Outfit already exists");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving outfit");
    }
  };

  const tileDisabled = ({ date, view }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div>
      <div className="Upload_Header3">
        <Link to="/Algorithm">
          <button className="PUup-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </Link>
        <h1 className="LogoFont3">LookALike</h1>
      </div>
      <h2 className="save_to_clendar_h">Add Algorithm Look to your Calendar</h2>
      <h4 className="h4">
        Choose a date on which you will wear your new outfit
      </h4>
      <div className="save_to_calendar">
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileDisabled={tileDisabled}
        />
      </div>
      <div>
        <button className="BTNCal" onClick={handleAddToCalendar}>
          Add Outfit to Calendar
        </button>
      </div>
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
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        spacing={2}
      >
        {showAlert && (
          <Alert 
            severity="error" 
            onClose={() => {
              setShowAlert(false);
              navigate("/Algorithm");
            }}
          >
            <AlertTitle>Save failed</AlertTitle>
            This look already exists
          </Alert>
        )}
      </Stack>
      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </div>
  );
};

export default AlgorithmCalendarPage;