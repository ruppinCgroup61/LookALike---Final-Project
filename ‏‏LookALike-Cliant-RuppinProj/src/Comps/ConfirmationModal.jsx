import React from "react";
import "../CSS/Modal.css"; // Add necessary CSS for styling

const ConfirmationModal = ({ showModal, closeModal }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
         
        </div>
        <div className="modal-body">
          <p>The payment request has been sent for approval</p>
        </div>
        <div className="modal-footer">
          <button onClick={closeModal} className="close-modal-button">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
