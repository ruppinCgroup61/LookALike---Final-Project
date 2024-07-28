import React from "react";
import { useNavigate } from "react-router-dom";

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
        <h3 className="modal-title">Choose Popup:</h3>
        <div className="popup-list-container">
          {popups.length > 0 ? (
            <ul className="popup-list">
              {popups.map(popup => (
                <li 
                  key={popup.popUpId} 
                  className="popup-item"
                  onClick={() => handlePopupClick(popup.popUpId, popup.popUp_Name)}
                  style={{ cursor: 'pointer' }}
                >
                  {popup.popUp_Name}
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