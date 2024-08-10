import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/PopupModal.css";

const PopupModal = ({ isOpen, onClose, popups }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePopupClick = (popUpId, popUp_Name) => {
    sessionStorage.setItem('PopupID', popUpId);

     // סגירת המודל
     onClose();
    
     if(sessionStorage.getItem("from") == "addnewitem")
     navigate('/UploadItem');
    //showmypopups
    if(sessionStorage.getItem("from") == "showmypopups") {
      sessionStorage.setItem('PopupName', popUp_Name);
      navigate('/ItemsInPopup');
    }

     sessionStorage.setItem('from', "");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Choose a Popup:</h3>
        <div className="popup-list-container">
          {popups.length > 0 ? (
            <ul className="popup-list">
              {popups.sort((a, b) => {
              // ממיין את הפעילים (status: true) לפני הלא פעילים (status: false)
              if (a.status && !b.status) return -1;
              if (!a.status && b.status) return 1;
              return 0;
            }).map(popup => (
                <li 
                  key={popup.popUpId} 
                  className={`popup-item ${popup.status ? 'green' : 'red'}`}
                  // className="popup-item"
                  onClick={popup.status ? () => handlePopupClick(popup.popUpId, popup.popUp_Name) : null}
                  style={{ cursor: 'pointer' }}
                >
                  {popup.popUp_Name}  <span 
                className={`status-dot ${popup.status ? 'green' : 'red'}`}
              ></span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-popups-message">You have no popups yet.</p>
          )}
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopupModal;