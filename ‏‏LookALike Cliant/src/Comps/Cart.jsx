import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NaviBarFooter from "./NaviBarFooter";
import ConfirmationModal from "./ConfirmationModal"; // Import the modal
import "../CSS/PopUp.css";

const Cart = () => {
    const { email, popUpId,popupname } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem(`cart_${popUpId}`)) || [];
        setCartItems(storedCart);
    }, [popUpId]);

    const clearCart = () => {
        localStorage.removeItem(`cart_${popUpId}`);
        setCartItems([]);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    const handleBitClick = () => {
        clearCart();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        
    };

    const isCartEmpty = cartItems.length === 0;

    return (
        <div className="app-container">
            <div className="Upload_Header3">
                <button onClick={() => navigate(`/popup-details/${email}/${popUpId}/${popupname}`)} className="popupback">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h4 className="cc" id="LogoFont3">Shopping cart</h4>
            </div>
            <div className="list-cart-item">
                {isCartEmpty ? (
                    <p>Your cart is empty</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} id="cartpopup">
                            <img src={item.itemImage} alt={item.itemName} />
                            <div className="item-info">
                                <p>{item.itemName}</p>
                                <p>{item.price} $</p>
                            </div>
                        </div>
                    ))
                )}
                <div className="cart-total">
                    <p style={{fontSize: '22px'}}>Total: ${calculateTotal()}</p>
                    <button
                        onClick={() => {
                            clearCart();
                            navigate(`/popup-details/${email}/${popUpId}/${popupname}`);
                        }}
                        className="clear-cart-button"
                        disabled={isCartEmpty} // Disable if the cart is empty
                    >
                        Clear cart
                    </button>
                </div>
               
                {!isCartEmpty && ( // Only show the image if the cart is not empty
                    <div>
                        <img
                            src="https://i.imgur.com/5j46uJL.png"
                            className="bitlogo"
                            alt="Bit logo"
                            onClick={handleBitClick}
                        />
                    </div>
                )}
               
            </div>
            <div className="bottom-div">
                <NaviBarFooter />
            </div>

            {/* Include the Confirmation Modal */}
            <ConfirmationModal showModal={showModal} closeModal={closeModal} />
        </div>
    );
};

export default Cart;
