import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NaviBarFooter from "./NaviBarFooter";
import "../CSS/Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LookCalendar = () => {
  const userEmail = sessionStorage.getItem("email");
  const [looks, setLooks] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedLooks, setSelectedLooks] = useState([]);

  useEffect(() => {
    fetch(
      `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/ManualLook/GetLooksDetails/${userEmail}`,
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
        setLooks(data);
        const dates = [
          ...new Set(
            data.map((look) => new Date(look.calendarDate).toDateString())
          ),
        ];
        setMarkedDates(dates.map((dateString) => new Date(dateString)));
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });
  }, []);

  const tileContent = ({ date, view }) => {
    if (
      view === "month" &&
      markedDates.find((d) => d.toDateString() === date.toDateString())
    ) {
      return <div className="dot"></div>;
    }
    return null;
  };

  console.log("555");
  console.log(looks);
  console.log("555");

  const handleDateClick = (date) => {
    const selected = looks.filter(
      (look) =>
        new Date(look.calendarDate).toDateString() === date.toDateString()
    );
    setSelectedLooks(selected);
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

        <div className="calendar-container">
          <h3>Outfit calendar</h3>
          <Calendar tileContent={tileContent} onClickDay={handleDateClick} />
        </div>

        {selectedLooks.length > 0 && (
          <div className="look-details">
            <h3>
              {new Date(selectedLooks[0].calendarDate).toDateString()}{" "}
              :
            </h3>
            <div className="looks-list">
              {selectedLooks.map((look, index) => (
                <div key={index} className="look-item">
                  <div className="looks_cal_images">
                    <img src={look.topSelection_Image} alt="Top" />
                    <img src={look.buttomSelection_Image} alt="Bottom" />
                  </div>
                  <p className="look-description">{look.top_Item_Name} & {look.bottom_Item_Name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bottom-div">
          <NaviBarFooter />
        </div>
      </div>
    </>
  );
};

export default LookCalendar;
