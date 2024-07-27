import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiTShirtThin, PiPantsThin } from 'react-icons/pi';
import { CiSquarePlus } from 'react-icons/ci';
import '../src/ManualLook.css';
import NaviBarFooter from "./NaviBarFooter";

const FCManualLook = (props) => {
  const { selectedTop, selectedBottom, setSelectedTop, setSelectedBottom } = props;
  const userEmail = sessionStorage.getItem("email");
  const navigate = useNavigate();

  console.log("Props received:", { selectedTop, selectedBottom });

  const saveLook = async () => {
    if (!selectedTop || !selectedBottom) {
      alert('Please select both a top and a bottom.');
      return;
    }

    const outfitToSave = {
      lookId: -1,
      topSelection_ItemId: selectedTop.item_ID,
      bottomSelection_ItemId: selectedBottom.item_ID,
      topSelection_Image: selectedTop.image,
      buttomSelection_Image: selectedBottom.image,
      createdDate: new Date().toISOString(),
      calendarDate: new Date().toISOString(),
      userEmail: userEmail,
    };

    console.log("Outfit to save:", outfitToSave);

    try {
      const response = await fetch('https://localhost:7215/api/ManualLook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(outfitToSave),
      });

      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (response.ok) {
        console.log("Outfit saved successfully");
        alert('Outfit saved successfully');
        
      } else {
        console.log("Failed to save outfit:", response.status, response.statusText, responseText);
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
        <div className="Upload_Header3">
          <h1 className='LogoFont3'>LookALike</h1>
        </div>
        <h2 >Build Your New Outfit</h2>
        <div className="icon-section">
          <div className="icon-container">
            <Link to="/select-top">
              {selectedTop ? (
                <img src={selectedTop.image} alt={selectedTop.name} className="icon" />
              ) : (
                <CiSquarePlus className="icon-button" onClick={() => setSelectedTop(/* ערך חדש של selectedTop */)} />
              )}
              {!selectedTop && <PiTShirtThin className="icon" />}
            </Link>
          </div>
          <div className="icon-container">
            <Link to="/select-bottom">
              {selectedBottom ? (
                <img src={selectedBottom.image} alt={selectedBottom.name} className="icon" />
              ) : (
                <CiSquarePlus className="icon-button" onClick={() => setSelectedBottom(/* ערך חדש של selectedBottom */)} />
              )}
              {!selectedBottom && <PiPantsThin className="icon" />}
            </Link>
          </div>
        </div>

        <div className='ADD_Look'>
          <Link to="/calendar">
            <button>Add to Calendar</button>
          </Link>
          <button onClick={saveLook}>Save Look</button>
        </div>
        <div className='bottom-div'>
          <NaviBarFooter />
        </div>
      </div>
    </>
  );
};

export default FCManualLook;
