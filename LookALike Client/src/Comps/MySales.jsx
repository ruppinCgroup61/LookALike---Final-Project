import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NaviBarFooter from "./NaviBarFooter";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { GoTrash } from "react-icons/go";


const MySales = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");

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

  const deleteItem = (id) => {
    fetch(`https://localhost:7215/api/ClothingAd/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        // לאחר מחיקה מוצלחת, עדכן את המצב על ידי הסרת הפריט מהמערך
        setItems(items.filter(item => item.ad_ID !== id));
      })
      .catch((error) => {
        console.error("There was a problem with the delete operation:", error);
      });
  };

  return (
    <div className="app-container">
      <div className="Upload_Header3">
        <button onClick={() => navigate("/MainPopUpC")} className="popupback">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h4 className="ss" id="LogoFont3">My Item For Sale</h4>
      </div>
      <div className="clothing-list">
        {items.length === 0 ? (
          <p>No items available for this pop-up.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="clothing-item" id="popupdetailes">
              <div className="clothing-image">
                <img src={item.item_Image} alt={item.itemName} />
                <div className="item-info">
                  <p className="p_">{item.itemName}</p>
                  <p>{item.price} $</p>
                </div>
                <button
                  className="add-to-bin-button"
                  onClick={() => deleteItem(item.ad_ID)} // קריאה לפונקציית המחיקה בלחיצה
                >
                  <GoTrash />
                </button>
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
