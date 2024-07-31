import React, { useState, useEffect } from "react";
import NaviBarFooter from "./NaviBarFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../CSS/AllLook.css";

const AllLook = () => {
  const userEmail = sessionStorage.getItem("email");
  const [looks, setLooks] = useState([]);
  // 'https://localhost:7215/api/ManualLook/GetLooksDetails/yakirco0412%40gmail.com' \
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
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });
  }, []);

  return (
    <div className="app-container">
      <div className="Upload_Header3">
          <Link to="/HomeLook">
            <button className="PUup-button">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </Link>
          <h1 className="LogoFont3">LookALike</h1>
        </div>
      <div>
        <h1 className="HeaderForAllLook">ALL MY LOOKS</h1>
        {/* הכותרת מעל הצגת הלוקים */}
      </div>
      <div className="ML_clothing-list">
        {looks.map((look, index) => (
          <div key={index} className="ML_clothing-item">
            <div className="ML_clothing-image">
              <img src={look.topSelection_Image} alt="Top" />
              <img src={look.buttomSelection_Image} alt="Bottom" />
            </div>
            <div className="ML_clothing-details">
              <p>
                {look.top_Item_Name} & {look.bottom_Item_Name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </div>
  );
};

export default AllLook;
