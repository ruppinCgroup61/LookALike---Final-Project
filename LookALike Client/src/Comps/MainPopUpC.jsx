import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/HomeLook.css";
import "../CSS/PopUp.css";
import NaviBarFooter from "./NaviBarFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MainPopUpC = () => {
  const userEmail = sessionStorage.getItem("email");
  const [pops, setPop] = useState([]);
  const [userItemsForSale, setUserItemsForSale] = useState([]);
  const [marketPlaceItems, setMarketPlaceItems] = useState([]);
  const [loadingPops, setLoadingPops] = useState(true); // Loading state for popups
  const [loadingUserItems, setLoadingUserItems] = useState(true); // Loading state for user items
  const [loadingMarketPlace, setLoadingMarketPlace] = useState(true); // Loading state for marketplace
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch active popups
    fetch(`https://localhost:7215/api/PopUp/GetActivePopUps`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('pops-up', data);
        setPop(data);
        setLoadingPops(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
        setLoadingPops(false); // Ensure loading is stopped even on error
      });

    // Fetch user items for sale
    fetch(`https://localhost:7215/api/ClothingAd/GetAllUserItemsForSale${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserItemsForSale(data.slice(0, 5));
        setLoadingUserItems(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
        setLoadingUserItems(false); // Ensure loading is stopped even on error
      });

    // Fetch marketplace items
    fetch(`https://localhost:7215/api/ClothingAd/GetWithFullName`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMarketPlaceItems(data.slice(0, 5));
        setLoadingMarketPlace(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
        setLoadingMarketPlace(false); // Ensure loading is stopped even on error
      });
  }, [userEmail]);

  const formatDate = (dateString) => {
    const datePart = dateString.split("T")[0];
    const [year, month, day] = datePart.split("-");
    return `${day}.${month}.${year}`;
  };

  const handlePopUpClick = (popUpId, user_Email,popUp_Name) => {
    navigate(`/popup-details/${user_Email}/${popUpId}/${popUp_Name}`);
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
          {loadingPops ? (
            <div className="" >
              <div className="skeleton skeleton-popup"></div>
              <div className="skeleton skeleton-popup"></div>
            </div>

          ) : (
            pops.length === 0 ? (
              <div id="no-popup-message">There are no active<br></br>pop-ups at the moment</div>
            ) : (
              pops.slice(0, 2).map((pop, index) => (
                <div key={index} id="userpopup" onClick={() => handlePopUpClick(pop.popUp_Id, pop.user_Email,pop.popUp_Name)}>
                  <img src={pop.userImage} alt="PopUp" />
                  <div>
                    <p>{pop.popUp_Name}</p>
                    <p>{pop.fullUserName}</p>
                    <p>{formatDate(pop.startDate)} - {formatDate(pop.endDate)}</p>
                  </div>
                </div>
              ))
            )
          )}
        </div>

        <div>
          <Link to="/AllPopUp">
            <button className="popupbutton" disabled={pops.length === 0}>All Pop-Ups</button>
          </Link>
        </div>

        <div className="items-for-sale-popup" onClick={() => navigate("/MySales")}>
          <h2>Your Items For Sale</h2>
          <div className="items-images-popup">
            {loadingUserItems ? (
              <div className="skeleton skeleton-items"></div>
            ) : userItemsForSale.length === 0 ? (
              <div>You don't have any item for sale yet</div>
            ) : (
              userItemsForSale.map((item, index) => (
                <img key={index} src={item.item_Image} alt={item.itemName} className="small-item-image-popup" />
              ))
            )}
          </div>
        </div>

        <div className="items-for-sale-popup" onClick={() => navigate("/MarketPlace")}>
          <h2>Enter Market Place</h2>
          <div className="items-images-popup">
            {loadingMarketPlace ? (
              <div className="skeleton skeleton-items"></div>
            ) : (
              marketPlaceItems.map((item, index) => (
                <img key={index} src={item.item_Image} alt={item.itemName} className="small-item-image-popup" />
              ))
            )}
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
