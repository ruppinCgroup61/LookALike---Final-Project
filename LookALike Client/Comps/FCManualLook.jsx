import React from 'react';
import { Link } from 'react-router-dom';
import { PiTShirtThin, PiPantsThin } from 'react-icons/pi';
import { CiSquarePlus } from "react-icons/ci";
import '../src/ManualLook.css';
import '../src/CreateALook.css';

const FCManualLook = (props) => {
  const { selectedTop, selectedBottom, setSelectedTop, setSelectedBottom } = props;

  return (
    <div className="app-container">
      <h1 className="urbanist-heading">Build Your New Outfit</h1>
      <div className="icon-section">
        <div className="icon-container1">
          <Link to="/TopSelectionPage">
            {selectedTop ? (
              <img src={selectedTop.image} alt={selectedTop.name} className="selected-icon" />
            ) : (
              <CiSquarePlus className="icon-button" onClick={() => setSelectedTop(/* הערך החדש של selectedTop */)} />
            )}
            {!selectedTop && <PiTShirtThin className="icon" />}
          </Link>
        </div>
        <div className="icon-container2">
          <Link to="/BottomSelectionPage">
            {selectedBottom ? (
              <img src={selectedBottom.image} alt={selectedBottom.name} className="selected-icon" />
            ) : (
              <CiSquarePlus className="icon-button" onClick={() => setSelectedBottom(/* הערך החדש של selectedBottom */)} />
            )}
            {!selectedBottom && <PiPantsThin className="icon" />}
          </Link>
        </div>
      </div>

      <Link to="/CalendarPage">
        <button className="calendar-button">Add to Calendar</button>
      </Link>
    </div>
  );
};

export default FCManualLook;
