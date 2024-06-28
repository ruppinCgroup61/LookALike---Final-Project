import React from "react";

const PopupModal = ({ isOpen, onClose, popups }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Your Popups:</h3>
        <div className="popup-list-container">
          {popups.length > 0 ? (
            <ul className="popup-list">
              {popups.map(popup => (
                <li key={popup.popUpId} className="popup-item">
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