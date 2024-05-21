import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../src/WardrobeFilters.css";
import WardrobeFilters from "./WardrobeFilters";
import NaviBarFooter from "./NaviBarFooter";
import CircularProgress from "@mui/material/CircularProgress";


export default function MarketPlace() {
  const [dataFromServer, setDataFromServer] = useState(null);
  const [filteredClothes, setFilteredClothes] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    // קבלת הפריטים של המשתמש מהשרת
    fetch(`https://localhost:7215/api/ClothingAd`, {
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
        <CircularProgress  color="inherit"/>
        {/* <div className="Loading">Your wardrobe is in preparation....</div> */}
      </div>
    );  }


  console.log("99");
  console.log(dataFromServer);
  console.log("99");

  function Showad(item) {
    navigateTo("/ad", {
      state: { ...item },
    });
  }

  return (
    <>
      <div className="containerW">
        <div className="header">
          <WardrobeFilters
            clothes={dataFromServer}
            setFilteredClothes={setFilteredClothes}
          />
        </div>
        <div className="clothing-list">
          {filteredClothes.map((item, index) => (
            <div key={index} className="clothing-item">
              <div className="clothing-image">
                <img
                  src={item.item_Image
                  }
                  alt={item.itemName
                  }
                  onClick={() => Showad(item)}
                />
              </div>
              <div className="clothing-details">
                <p>
                  <strong>
                    {item.itemName.toUpperCase()} -{" "}
                    {item.price}$
                  </strong>
                </p>
              </div>
            </div>
          ))}
         <div className='Navbar Footer'>
            <NaviBarFooter />
          </div>
        </div>
      </div>
    </>
  );
}
