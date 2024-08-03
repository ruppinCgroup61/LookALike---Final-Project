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
  }, []);

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
          <Link to="/FCManualLook">
            <button id="ButtonHomeLook">GENERATE OUTFIT</button>
          </Link>
        </div>
        <div className="LastOutfitBlock">
          <h3 id="h3"> MY LAST OUTFITS</h3>
          {/* {filteredClothes.slice(0, 3).map((item, index) => ( */}
          <div id="bb">
            <div id="clothing-list-home">
              {loading ? (
                <div id="loading-message">Loading looks...</div>
              ) : looks.length === 0 ? (
                <div id="no-looks-message">You don't have any look yet</div>
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
          {/* <Link to="/AllLook">
            <button id="ButtonMoreLook">ALL OUTFITS</button>
          </Link> */}
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
      </div>
    </>
  );
};

export default HomeLook;
