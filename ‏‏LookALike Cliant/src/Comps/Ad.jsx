import { useNavigate, useParams } from "react-router-dom";
import { FaWhatsapp, FaTimes } from "react-icons/fa"; // Import FaTimes icon
import React, { useState, useEffect } from "react";

import Map from "./Map";
import NaviBarFooter from "./NaviBarFooter";
import "../CSS/Ad.css";

export default function Ad() {
  const { itemID } = useParams();
  console.log(itemID)
  const [dataFromServer, setDataFromServer] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    // Fetch the user's items from the server
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
        console.log(data); // Handle the data received from the server
        setDataFromServer([...data]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  if (!dataFromServer) {
    return <div>Loading...</div>;
  }
  console.log(dataFromServer)
  // מציאת המדועה לפי הפריט
  const foundAd = dataFromServer.find(obj => obj.item_ID == itemID);
  console.log(foundAd)
  //const lastAd = dataFromServer[dataFromServer.length - 1];

  // Function to open WhatsApp when the link is clicked
  const openWhatsApp = () => {
    window.open(`whatsapp://send?phone=+972${foundAd.phone_Number}`, "_blank");
    navigateTo("/MarketPlace");
  };

  // Function to navigate to MyWardrobe when the close button is clicked
  const closeAd = () => {
    navigateTo("/MarketPlace");
  };

  return (
    <>
      <div className="ad_container">
        <div className="ad_img">
        <h3>{foundAd.itemSize}</h3>
        <img src={foundAd.item_Image} alt={foundAd.itemName} />
        </div>
        <h3 style={{marginBottom: 10}}>{foundAd.itemName.toUpperCase()}</h3>
        {/* <h3>Size: {foundAd.itemSize}</h3> */}
        <h3 style={{marginTop: 0}}>By {foundAd.fullName.toUpperCase()}</h3>
        <p>Price: {foundAd.price}$</p>
        <p>Condition: {foundAd.condition1}</p>
        {/* Link that triggers the openWhatsApp function */}
        <p style={{marginBottom: 20, position: 'relative'}}>
          <a href="#" onClick={openWhatsApp} className="whatsapp_icon" style={{ color: "black" }}>
            <FaWhatsapp />
          </a>
          0{foundAd.phone_Number}
        </p>
        <p>{foundAd.address}</p>
        <Map address={foundAd.address} />
      </div>
      {/* Close button */}
      <div className="CloseAd" style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}>
        <FaTimes onClick={closeAd} size={24} />
      </div>
      <NaviBarFooter />
    </>
  );
}
