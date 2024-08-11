import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/HomeLook.css";
import NaviBarFooter from "./NaviBarFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const HomeLook = () => {
  const userEmail = sessionStorage.getItem("email");
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [CountItems, setCountItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(
      `https://localhost:7215/api/ManualLook/GetLooksDetails/${userEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
        setLoading(false);
      });

    fetch(
      `https://localhost:7215/api/Item/CountItems${userEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCountItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });
  }, [userEmail]);

  const CheckItems = () => {
    if (CountItems.length > 0 && CountItems[0].countItems >=2 && CountItems[1].countItems >=2) {
      console.log("You have enough items!");
      console.log(CountItems[0].clothing_Part, CountItems[0].countItems);
      console.log(CountItems[1].clothing_Part, CountItems[1].countItems);
      navigate("/ProgressComponent");
    } else {
      console.log("You don't have enough items to generate an outfit.");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="app-container">
        <div className="Upload_Header3">
          <button
            onClick={() => {
              navigate("/HomePage");
            }}
            className="PUup-button"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1 className="LogoFont3">LookALike</h1>
        </div>
        <h3 id="HeaderForLookHome">MY OUTFITS</h3>
        <div id="ADD_Look_home">
          <Link to="/FCManualLook">
            <button id="ButtonHomeLook">CREATE BY YOURSELF</button>
          </Link>
          <button id="ButtonHomeLook" onClick={CheckItems}>GENERATE OUTFIT</button>
        </div>
        <div className="LastOutfitBlock">
          <h3 id="h3"> MY LAST OUTFITS</h3>
          <div id="bb">
            <div id="clothing-list-home">
              {loading ? (
                <div id="loading-message">Loading looks...</div>
              ) : looks.length === 0 ? (
                <div className="no-looks-message">You don't have any look yet</div>
              ) : (
                looks.slice(-3).map((look, index) => (
                  <div key={index} id="clothing-item">
                    <div id="clothing-image">
                      <img src={look.topSelection_Image} alt="Top" />
                      <img src={look.buttomSelection_Image} alt="Bottom" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="ADD_Look_home">
          <Link to="/AllLook">
            <button id="ButtonHomeLook">ALL OUTFITS</button>
          </Link>
          <Link to="/LookCalendar">
            <button id="ButtonHomeLook"> OUTFITS CALENDAR</button>
          </Link>
        </div>

        <div className="bottom-div">
          <NaviBarFooter />
        </div>

        {showModal && (
          <div className="modal_HomeLook">
            <div className="modal-content_HomeLook">
              <p>You need to add more Items to your wardrobe in order to activate the Algorithm.</p>
              <div className="modal-footer_HomeLook">
                <button onClick={closeModal}>&times;</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeLook;
