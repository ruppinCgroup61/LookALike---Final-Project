import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NaviBarFooter from "./NaviBarFooter";
import { AiOutlineShopping, AiFillShopping } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import CircularProgress from "@mui/material/CircularProgress";

const PopUpDetails = () => {
  const { email, popUpId, popupname } = useParams();
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Fetch items for this pop-up
    fetch(
      `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/PopupDetails/GetAllPopUpItems/${email}/${popUpId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("There was a problem with fetch operation:", error);
      });

    // Get cart items from local storage
    const storedCart =
      JSON.parse(localStorage.getItem(`cart_${popUpId}`)) || [];
    setCartItems(storedCart);
    setCartCount(storedCart.length);
  }, [email, popUpId]);

  const addToCart = (item) => {
    const cartKey = `cart_${popUpId}`;
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Check if item already exists in the cart
    const itemExists = storedCart.some(
      (cartItem) => cartItem.itemId === item.itemId
    );

    if (itemExists) {
      // Provide feedback if item is already in the cart
      setMessage(`${item.itemName} is already in your cart!`);
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } else {
      // Add item to the cart
      storedCart.push(item);
      localStorage.setItem(cartKey, JSON.stringify(storedCart));
      setCartItems(storedCart);
      setCartCount(storedCart.length);

      // Provide feedback for successful addition
      setMessage(`${item.itemName} added to cart!`);
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    }
  };

  const isItemInCart = (itemId) => {
    return cartItems.some((cartItem) => cartItem.itemId === itemId);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="Upload_Header3">
        <button onClick={() => navigate("/MainPopUpC")} className="popupback">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h4 className="cc" id="LogoFont3">
          {popupname}
        </h4>
        <button
          onClick={() => navigate(`/cart/${email}/${popUpId}/${popupname}`)}
          className="cart-button"
        >
          <FiShoppingCart />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
      <div className="PUclothing-list" id="PU_cl">
        {items.length === 0 ? (
          <p style={{position: 'absolute', top: '100px', left: '0px', right: '0px'}}>No items available for this pop-up.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="clothing-item" id="popupdetails">
              <div className="clothing-image" id="cloimgdiv">
                <img src={item.itemImage} alt={item.itemName} />
                <p id="psize">{item.itemSize}</p>
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(item)}
                >
                  {isItemInCart(item.itemId) ? (
                    <AiFillShopping />
                  ) : (
                    <AiOutlineShopping />
                  )}
                </button>
              </div>
              <div className="item-info">
              
                <p className="p_">{item.itemName}</p>
                <p className="p_">{item.price} $</p>
              </div>
            </div>
          ))
        )}
      </div>
      {message && <div className="notification">{message}</div>}
      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </div>
  );
};

export default PopUpDetails;
