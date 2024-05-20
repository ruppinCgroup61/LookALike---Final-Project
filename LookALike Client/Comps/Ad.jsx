import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import React, { useState, useEffect } from "react";

import Map from "./Map";
import NaviBarFooter from "./NaviBarFooter";
import "../src/Ad.css";

export default function Ad() {

  const [dataFromServer, setDataFromServer] = useState(null);
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
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });
    }, []);

    if (!dataFromServer) {
      return <div>Loading...</div>;
    }

    console.log("88")
    console.log(dataFromServer)
    console.log("88")

    const lastAd = dataFromServer[dataFromServer.length - 1];

  // קבלת הפרמטרים מקומפוננטת CreateAd
  // const location = useLocation();
  // const { price, address, condition, photo, color, name, phone } =
  //   location.state;

  // פונקציה הפותחת את אפליקציית WhatsApp כאשר לוחצים על הקישור
  const openWhatsApp = () => {
    // יפתח חלון וואצאפ
    window.open(`whatsapp://send?phone=+972${lastAd.phone_Number}`, "_blank");
    // מעבר למרקט פלייס
    navigateTo("/marketplace");
  };

  return (
    <>
      <div className="ad_container">
        <img src={lastAd.item_Image} alt={lastAd.item_Image} />
        <h3>
          {lastAd.itemName.toUpperCase()}
        </h3>
        <p>{lastAd.price}$</p>
        <p>Condition: {lastAd.condition1}</p>
        <p>{lastAd.address}</p>
        <Map address={lastAd.address} />
        <br />
        {/* הקישור שמפעיל את פונקציית openWhatsApp */}
        <p>
          <a href="#" onClick={openWhatsApp} style={{ color: "black" }}>
            <FaWhatsapp />
          </a>
          0{lastAd.phone_Number}
        </p>
      </div>
      <NaviBarFooter />
    </>
  );
}
