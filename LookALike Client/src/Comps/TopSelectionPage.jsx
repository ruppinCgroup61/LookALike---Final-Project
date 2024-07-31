import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PiSmileySad } from "react-icons/pi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@mui/material/CircularProgress";
import NaviBarFooter from "./NaviBarFooter";

const TopSelectionPage = ({ setSelectedTop }) => {
  //console.log("sss")
  const [tops, setTops] = useState([]);
  const userEmail = sessionStorage.getItem("email"); // Retrieve email from session storage
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://localhost:7215/api/Item/GetAllTop${userEmail}`, {
      // Correct path according to your API
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Error fetching tops");
          throw new Error("Error fetching tops");
        }
        return response.json();
      })
      .then((data) => {
        setTops(data);
        setIsLoading(false);
        console.log("Data fetched successfully:", data);
      })
      .catch((error) => {
        console.error("Error during fetching tops:", error);
        setIsLoading(false);
      });
  }, []);

  // console.log(data);

  if (isLoading) {
    return (
      <div className="loading-container">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (tops.length !== 0) {
    return (
      <>
        <div className="Upload_Header3">
          <Link to="/FCManualLook">
            <button className="PUup-button">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </Link>
          <h1 className="LogoFont3">LookALike</h1>
        </div>
        <h2 className="selTop_h2">Select a Top</h2>
        <div className="list-tops">
          {tops.map((top) => (
            <div key={top.item_ID}>
              <Link to="/FCManualLook" onClick={() => setSelectedTop(top)}>
                <img id="selPart_img" src={top.image} alt={top.name} />
                <p>{top.name}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="bottom-div">
          <NaviBarFooter />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="Upload_Header3">
        <Link to="/FCManualLook">
          <button className="PUup-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </Link>
        <h1 className="LogoFont3">LookALike</h1>
      </div>
      <PiSmileySad className="sorry_selTop_icon" />
      <h3>Sorry, you must have some items in your closet</h3>
      <Link to="/MyWardrobe">
        <button className="btn_my_closet">My closet</button>
      </Link>
      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </>
  );
};

export default TopSelectionPage;
