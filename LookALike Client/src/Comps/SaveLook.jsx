import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PiTShirtThin, PiPantsThin } from 'react-icons/pi';
import TopSelectionPage from './TopSelectionPage';
import BottomSelectionPage from './BottomSelectionPage';
import CalendarPage from './CalendarPage';
import { CiSquarePlus } from "react-icons/ci";

const FCManualLook = (props) => {
  
  const { selectedTop, selectedBottom, setSelectedTop, setSelectedBottom } = props;
  const userEmail = sessionStorage.getItem("email"); 
const addtocalendar=() => {
  //להפוך את הכפתור לenable
}

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);


  const saveLook = async () => {
    const outfit = {
      lookId: -1,
      topSelection_ItemId: selectedTop.item_ID,
      bottomSelection_ItemId: selectedBottom.item_ID,
      topSelection_Image: selectedTop.image,
      bottomSelection_Image: selectedBottom.image,
      createdDate: new Date().toISOString(), // תאריך הנוכחי
      calendarDate: yesterday.toISOString(), // תאריך של אתמול
      userEmail:userEmail
    };

    try {
      const response = await fetch('https://localhost:7215/api/ManualLook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(outfit),
      });

      if (response.ok) {
        alert('Outfit saved successfully');
      } else {
        alert('Failed to save outfit');
      }
    } catch (error) {
      console.error('Error saving outfit:', error);
      alert('Error saving outfit');
    }
  };

  return (
    <>
      <div className="app-container">
        <h1>Build Your New Outfit</h1>
        <div className="icon-section">
          <div className="icon-container">
            <Link to="/select-top">
              {selectedTop ? (
                <img src={selectedTop.image} alt={selectedTop.name} className="icon" />
              ) : (
                <CiSquarePlus className="icon-button" onClick={() => setSelectedTop()} />
              )}
              {!selectedTop && <PiTShirtThin className="icon" />}
            </Link>
          </div>
          <div className="icon-container">
            <Link to="/select-bottom">
              {selectedBottom ? (
                <img src={selectedBottom.image} alt={selectedBottom.name} className="icon" />
              ) : (
                <CiSquarePlus className="icon-button" onClick={() => setSelectedBottom()} />
              )}
              {!selectedBottom && <PiPantsThin className="icon" />}
            </Link>
          </div>
        </div>

        <button onClick={saveLook}>SAVE LOOK</button>
        <Link to="/calendar">
          <button disabled onClick={addtocalendar}>Add to Calendar</button>
        </Link>
      </div>
    </>
  );
};

export default FCManualLook;
