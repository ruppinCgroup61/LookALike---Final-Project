import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NaviBarFooter from './NaviBarFooter';
import '../CSS/Calendar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LookCalendar = () => {
  const userEmail = sessionStorage.getItem("email");
  const [looks, setLooks] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedLook, setSelectedLook] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:7215/api/ManualLook?userEmail=${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setLooks(data);
      const dates = data.map((look) => new Date(look.calendarDate));
      setMarkedDates(dates);
    })
    .catch((error) => {
      console.error("There was a problem with fetch operation:", error);
    });
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === 'month' && markedDates.find(d => d.toDateString() === date.toDateString())) {
      return <div className="dot"></div>;
    }
    return null;
  };

  const handleDateClick = (date) => {
    const selected = looks.find(look => new Date(look.calendarDate).toDateString() === date.toDateString());
    setSelectedLook(selected);
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
          <h1 className='LogoFont3'>LookALike</h1>
        </div>
        
      <div className="calendar-container">
        <Calendar
          tileContent={tileContent}
          onClickDay={handleDateClick}
        />
      </div>
      {selectedLook && (
        <div className="look-details">
          <h3>Look Details</h3>
          <p>wear date: {new Date(selectedLook.calendarDate).toDateString()}</p>
         
          <div className="images">
            <img src={selectedLook.topSelection_Image} alt="Top" />
            <img src={selectedLook.buttomSelection_Image} alt="Bottom" />
          </div>
        </div>
      )}
      <div className='bottom-div'>
        <NaviBarFooter />
      </div>
      </div>
    </>
  );
};

export default LookCalendar;
