import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/WardrobeFilters.css";
import WardrobeFilters from "./WardrobeFilters";
import NaviBarFooter from "./NaviBarFooter";
import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function MarketPlace() {
  const [dataFromServer, setDataFromServer] = useState(null);
  const [filteredClothes, setFilteredClothes] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    // קבלת המודעות מהשרת (יחד עם שם בעל הפריט)
    fetch(`https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/ClothingAd/GetWithFullName`, {
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
        console.log(data); // ניתן לעדכן את ה-state או לעשות פעולות נדרשות עם הנתונים שהתקבלו
        setDataFromServer([...data]);
        setFilteredClothes([...data]);
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });
  }, []);

  if (!dataFromServer) {
    return (
      <div className="loading-container">
        <CircularProgress color="inherit" />
        {/* <div className="Loading">Your wardrobe is in preparation....</div> */}
      </div>
    );
  }

  console.log(dataFromServer);

  function Showad(item) {
    navigateTo(`/Ad/${item.item_ID}`);
  }

  return (
    <>
      <div className="containerW">
        <div className="Upload_Header3">
          <Link to="/MainPopUpC">
            <button
              className="PUup-button"
              style={{
                position: "absolute",
                top: "40px",
                left: "30px",
                height: '10px'
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </Link>
        </div>
        <div className="header">
          <WardrobeFilters
            clothes={dataFromServer}
            setFilteredClothes={setFilteredClothes}
            flag='mp'
          />
        </div>
        <h2
          style={{
            position: "absolute",
            top: "65px",
            left: "0px",
            right: "0px",
          }}
        >
          Market place
        </h2>
        <div id="MP_ALL">
          <div className="clothing-list">
            {filteredClothes.map((item, index) => (
              <div key={index} className="clothing-item">
                <div className="clothing-image">
                  <img
                    src={item.item_Image}
                    alt={item.itemName}
                    onClick={() => Showad(item)}
                  />
                </div>
                <div className="clothing-details">
                  <p>{item.fullName}</p>
                  <p>
                    {item.itemName.toUpperCase()} - {item.price}$
                  </p>
                </div>
              </div>
            ))}
            <div className="Navbar Footer">
              <NaviBarFooter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
