import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PiTShirtThin, PiPantsThin } from 'react-icons/pi';
import TopSelectionPage from './TopSelectionPage';
import BottomSelectionPage from './BottomSelectionPage';
import CalendarPage from './CalendarPage'; // קומפוננטה של הלוח שנה
import '../CSS/ManualLook.css';
import { CiSquarePlus } from "react-icons/ci";
import NaviBarFooter from "./NaviBarFooter";

const FCManualLook = (props) => {

  const { selectedTop, selectedBottom, setSelectedTop, setSelectedBottom } = props;

  return (
    <>
      <div className="app-container">
        <div className="Upload_Header3">
          <h1 className='LogoFont3'>LookALike</h1>
        </div>
        <h1 className='HeaderForLook'>Build Your New Outfit</h1>
        <div className="icon-section">
          <div className="icon-container">
            <Link to="/select-top">
              {selectedTop ? (
                <img src={props.selectedTop.image} alt={props.selectedTop.name} className="icon" />
              ) : (
                <CiSquarePlus className="icon-button" onClick={() => props.setSelectedTop(/* הערך החדש של selectedTop */)} />
              )}
              {!props.selectedTop && <PiTShirtThin className="icon" />}
            </Link>
          </div>
          <div className="icon-container">
            <Link to="/select-bottom">
              {selectedBottom ? (
                <img src={props.selectedBottom.image} alt={props.selectedBottom.name} className="icon" />
              ) : (
                <CiSquarePlus className="icon-button" onClick={() => props.setSelectedBottom(/* הערך החדש של selectedBottom */)} />
              )}
              {!props.selectedBottom && <PiPantsThin className="icon" />}
            </Link>
          </div>
        </div>

        {/* <button onClick={savelook}>SAVE LOOK</button> */}
        <div className='ADD_Look'>
          <Link to="/calendar">
            <button >Add to Calendar</button>
          </Link></div>
        <div className='bottom-div'>
          <NaviBarFooter />
        </div>
      </div>
    </>
  );
};

export default FCManualLook;


