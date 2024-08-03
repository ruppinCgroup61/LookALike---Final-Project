import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/HomeLook.css";
import "../CSS/PopUp.css";
import NaviBarFooter from "./NaviBarFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MainPopUpC = (props) => {
  const userEmail = sessionStorage.getItem("email");
  const [pops, setPop] = useState([]);
  const [userItemsForSale, setUserItemsForSale] = useState([]);
  const [marketPlaceItems, setMarketPlaceItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch active popups
    fetch(`https://localhost:7215/api/PopUp/GetActivePopUps`, {
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
        setPop(data);
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });

    // Fetch user items for sale
    fetch(`https://localhost:7215/api/ClothingAd/GetAllUserItemsForSale${userEmail}`, {
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
        setUserItemsForSale(data.slice(0, 5)); // Limiting to 5 items
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });

    // Fetch marketplace items
    fetch(`https://localhost:7215/api/ClothingAd/GetWithFullName`, {
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
        setMarketPlaceItems(data.slice(0, 5)); // Limiting to 5 items
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });
  }, [userEmail]);

  const formatDate = (dateString) => {
    const datePart = dateString.split("T")[0];
    const [year, month, day] = datePart.split("-");
    return `${day}.${month}.${year}`;
  };

  const handlePopUpClick = (popUpId, user_Email) => {
    navigate(`/popup-details/${user_Email}/${popUpId}`);
  };

  return (
    <>
      <div className="">
        <div className="Upload_Header3" id="headerP">
          <button
            onClick={() => {
              navigate("/HomePage");
            }}
            className="popupback"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h4 className="cc" id="LogoFont3">SHOPPING</h4>
        </div>

        <div id="list-home-pop">
          {pops.length === 0 ? (
            <div id="no-looks-message">You don't have any pop up yet</div>
          ) : (
            pops.slice(0, 2).map((pop, index) => (
              <div key={index} id="userpopup" onClick={() => handlePopUpClick(pop.popUp_Id, pop.user_Email)}>
                <img src={pop.userImage} alt="PopUp" />
                <div>
                  <p>{pop.popUp_Name}</p>
                  <p>{pop.fullUserName} </p>
                  <p>{formatDate(pop.startDate)} - {formatDate(pop.endDate)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <Link to="/AllPopUp">
            <button className="popupbutton">All Pop-Up</button>
          </Link>
        </div>

        {/* My Items for Sale */}
        <div className="items-for-sale-popup" onClick={() => navigate("/MySales")}>
          <h2>Your Items For Sale:</h2>
          <div className="items-images-popup">
          {userItemsForSale.length === 0 ? (
            <div>You don't have any item for sale yet</div>
          ) : (
            userItemsForSale.map((item, index) => (
              <img key={index} src={item.item_Image} alt={item.itemName} className="small-item-image-popup" />
            )))}
          </div>
        </div>

        {/* Market Place */}
        <div className="items-for-sale-popup" onClick={() => navigate("/MarketPlace")}>
          <h2>Enter Market Place:</h2>
          <div className="items-images-popup">
            {marketPlaceItems.map((item, index) => (
              <img key={index} src={item.item_Image} alt={item.itemName} className="small-item-image-popup" />
            ))}
          </div>
        </div>

        <div className="bottom-div">
          <NaviBarFooter />
        </div>
      </div>
    </>
  );
};

export default MainPopUpC;
