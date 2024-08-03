import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../CSS/Calendar.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { useNavigate } from "react-router-dom";
import NaviBarFooter from "./NaviBarFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const CalendarPage = ({
  selectedTop,
  selectedBottom,
  setSelectedTop,
  setSelectedBottom,
}) => {
  const [date, setDate] = useState(new Date());
  // const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const userEmail = sessionStorage.getItem("email");
  const TopToSave = selectedTop;
  const BottomToSave = selectedBottom;

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const [showAlert2, setAlert2] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    let timer;
    if (openSnackbar) {
      timer = setTimeout(() => {
        setOpenSnackbar(false);
        setSelectedTop(null);
        setSelectedBottom(null);
        navigateTo("/HomeLook");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [openSnackbar, navigateTo]);

  const handleAddToCalendar = async () => {
  // Create a new Date object set to the selected date
  const selectedDate = new Date(date);
  
  // Set the time to 00:00:00 in the local timezone
  selectedDate.setHours(0, 0, 0, 0);

  // Adjust for timezone offset
  const timezoneOffset = selectedDate.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  const adjustedDate = new Date(selectedDate.getTime() - timezoneOffset);

    const outfit = {
      lookId: -1,
      topSelection_ItemId: TopToSave.item_ID,
      buttomSelection_ItemId: BottomToSave.item_ID,
      topSelection_Image: TopToSave.image,
      buttomSelection_Image: BottomToSave.image,
      createdDate: new Date().toISOString(),
      calendarDate: adjustedDate.toISOString(),
      userEmail: userEmail,
    };

    console.log("444")
    console.log("LOOK:", outfit)
    console.log("444")

    try {
      const response = await fetch("https://localhost:7215/api/ManualLook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(outfit),
      });

      const responseText = await response.text();

      if (response.ok) {
        if (responseText == 1) {
          setSnackbarMessage(`The look was added successfully!`);
          setOpenSnackbar(true);
        }

        if (responseText == -1) {
          setAlert2(true);
          console.log("Outfit already exists");
          setSelectedTop(null);
          setSelectedBottom(null);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving outfit");
    }

    console.log("LOOK:", outfit);
  };

  const tileDisabled = ({ date, view }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div>
      <div className="Upload_Header3">
        <Link to="/FCManualLook">
          <button className="PUup-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </Link>
        <h1 className="LogoFont3">LookALike</h1>
      </div>
      <h2 className="save_to_clendar_h">Add the Look to your Calendar</h2>
      <h4 className="h4">
        Choose a date on which you will wear your new outfit and decide whether
        to receive a notification
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
        {showAlert2 && (
          <Alert severity="error" onClose={() => {
            setAlert2(false);
            navigateTo("/FCManualLook");
          }}>
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

export default CalendarPage;
