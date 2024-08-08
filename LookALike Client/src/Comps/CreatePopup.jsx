import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../CSS/CreatePopup.css";

const CreatePopup = () => {
  const navigate = useNavigate();
  const [popupName, setPopupName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let timer;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage("");
        navigate("/BusinessHomePage");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [successMessage, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!popupName || !startDate || !endDate) {
      setError("All fields are required");
      return;
    }

    const currentDate = new Date();
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);


    if (selectedStartDate < previousDate) {
      setError("Start date must be in the future");
      console.log(previousDate);
      return;
    }

    if (selectedEndDate <= selectedStartDate) {
      setError("End date must be after the start date");
      return;
    }

    // If all validations pass, proceed with creating the popup
    console.log("Creating popup:", { popupName, startDate, endDate });
    // Here you would typically send this data to your backend

    const storedEmail = sessionStorage.getItem("email");

    let popup = {
      popUpId: 0,
      userMail: storedEmail,
      startDate: startDate,
      endDate: endDate,
      status: false,
      popUp_Name: popupName,
    };

    fetch("https://localhost:7215/api/PopUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(popup),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Catch Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data === -1) {
          console.log("create popup failed");
        }
        if (data === 1) {
          console.log("create popup successful");
          setSuccessMessage("Popup created successfully!");
        }
      })
      .catch((error) => {
        console.error("Error during create popup:", error);
        setError("Failed to create popup. Please try again.");
        setSuccessMessage(""); // Clear any success message
      });
  };

  return (
    <div className="create-popup-container">
      <div className="Upload_Header">
        <button
          onClick={() => { navigate("/BusinessHomePage"); }}
          className="up-button"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="LogoFont">LookALike</h1>
      </div>
      <h2 id="hcreatenewpopup">Create New Popup</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="create-popup-form">
        <div className="form-group">
          <label htmlFor="popupName">Popup Name:</label>
          <input
            type="text"
            id="popupName"
            value={popupName}
            onChange={(e) => setPopupName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // Set min to today
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate} // End date can't be before start date
            required
          />
        </div>

        <button type="submit" className="create-button">
          Create Popup
        </button>
      </form>
    </div>
  );
};

export default CreatePopup;
