import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import NaviBarFooter from "./NaviBarFooter";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

import { CiShoppingCart } from "react-icons/ci";

import { FiShoppingCart } from "react-icons/fi";


import { AiOutlineShopping } from "react-icons/ai";


const PopUpDetails = () => {
  const { email, popUpId } = useParams(); 
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://localhost:7215/api/PopupDetails/GetAllPopUpItems/${email}/${popUpId}`, {
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
  }, [email, popUpId]);

  return (
    <div className="app-container">
      <div className="Upload_Header3">
        <button onClick={() => navigate("/AllPopUp")} className="popupback">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h4 className="cc" id="LogoFont3">Pop-Up Detailes</h4>
        <button onClick={() => navigate("/AllPopUp")} className="cart-button">
        <FiShoppingCart />
        </button>
      </div>
      <div className="clothing-list">
        {items.length === 0 ? (
          <p>No items available for this pop-up.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="clothing-item" id="popupdetailes">
              <div className="clothing-image">
                <img src={item.itemImage} alt={item.itemName} />
                <div className="item-info">
                  <p className="p_">{item.itemName}</p>
                  <p>{item.price} $</p>
                </div>
                <button className="add-to-cart-button">
                  <AiOutlineShopping />
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

export default PopUpDetails;
