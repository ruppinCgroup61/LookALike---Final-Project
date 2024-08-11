import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NaviBarFooter from "./NaviBarFooter";
import { GoTrash } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const MySales = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState(""); // State for feedback message
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:7215/api/ClothingAd/GetAllUserItemsForSale${email}`, {
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
        setItems(data);
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });
  }, [email]);

  const updateItemStatus = (id, statusCheck) => {
    fetch(`https://localhost:7215/api/Item/UpdateItemStatusAndDeleteAd?itemId=${id}&statusCheck=${statusCheck}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update item status");
        }
        return response.json();
      })
      .then(() => {
        // Set feedback message based on the action
        const action = statusCheck === 2 ? "sold" : "deleted";
        setMessage(`Item ${action} successfully!`);
        // Clear the feedback message after 3 seconds
        setTimeout(() => setMessage(""), 3000);

        // Re-fetch the updated items list to re-render the page
        fetch(`https://localhost:7215/api/ClothingAd/GetAllUserItemsForSale${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => setItems(data))
          .catch((error) => console.error("There was a problem with fetch operation:", error));
      })
      .catch((error) => {
        console.error("There was a problem with the update operation:", error);
      });
  };

  const deleteItem = (id) => {
    updateItemStatus(id, 1);
    closeModal();
  };

  const markAsSold = (id) => {
    updateItemStatus(id, 2);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="app-container">
       {/* Feedback Message */}
       {message && <div className="notification">{message}</div>}
      <div className="Upload_Header3">
        <button onClick={() => navigate("/MainPopUpC")} className="popupback">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h4 className="ss" id="LogoFont3">My Item For Sale</h4>
      </div>

      <div className="clothing-list">
        {items.length === 0 ? (
          <h3 className="alert-notexist" >You dont have items for sale</h3>
        ) : (
          items.map((item, index) => (
            <div key={index} className="clothing-item" id="popupdetailes">
              <div className="clothing-image">
                <img src={item.item_Image} alt={item.itemName} />
                <div className="item-info">
                  <p className="p_">{item.itemName}</p>
                  <p>{item.price} $</p>
                </div>
                <div>
                  <button
                    className="add-to-bin-button"
                    onClick={() => setSelectedItem(selectedItem === item.item_ID ? null : item.item_ID)}
                  >
                    <GoTrash />
                  </button>
                  {selectedItem === item.item_ID && (
                    <div className="popup">
                      <button
                        style={{
                          paddingLeft: 15,
                          paddingRight: 15,
                          marginBottom: 10,
                        }}
                        onClick={() => markAsSold(item.item_ID)}
                      >
                        <IoBagCheckOutline id="del_sale_icon" /> Sold
                      </button>
                      <button
                      onClick={openModal}
                      >
                        <MdDeleteForever id="del_sale_icon" /> Delete
                      </button>
                      <Modal
                      show={isModalOpen}
                      onHide={closeModal}
                      className="delete-confirm-modal"
                    >
                      <Modal.Dialog>
  
                          <Modal.Title className="delete-confirm-title">
                            Delete Item Ad
                          </Modal.Title>

                        <Modal.Body className="delete-confirm-body">
                          <p className="delete-confirm-message">
                            Are you sure ?
                          </p>
                        </Modal.Body>

                        <Modal.Footer className="delete-confirm-footer">
                          <Button
                            variant="secondary"
                            onClick={closeModal}
                            className="delete-confirm-cancel-btn"
                          >
                            Cancle
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => {
                              deleteItem(item.item_ID);
                            }}
                            className="delete-confirm-delete-btn"
                          >
                            Delete
                          </Button>
                        </Modal.Footer>
                      </Modal.Dialog>
                    </Modal>
                  
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </div>
  );
};

export default MySales;
