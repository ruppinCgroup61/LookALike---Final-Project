import { useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

import Map from "./Map";
import NaviBarFooter from "./NaviBarFooter";
import "../src/Ad.css";

export default function Ad() {
  // קבלת הפרמטרים מקומפוננטת CreateAd
  const location = useLocation();
  const { price, address, condition, photo, color, name, phone } =
    location.state;
  const navigateTo = useNavigate();

  // פונקציה הפותחת את אפליקציית WhatsApp כאשר לוחצים על הקישור
  const openWhatsApp = () => {
    // יפתח חלון וואצאפ
    window.open(`whatsapp://send?phone=+972${phone}`, "_blank");
    // מעבר למרקט פלייס
    navigateTo("/marketplace");
  };
  return (
    <>
      <div className="ad_container">
        <img src={photo} alt={photo} />
        <h3>
          {name.toUpperCase()}
        </h3>
        <p>{price}$</p>
        <p>Condition: {condition}</p>
        <p>{address}</p>
        <Map address={address} />
        <br />
        {/* הקישור שמפעיל את פונקציית openWhatsApp */}
        <p>
          <a href="#" onClick={openWhatsApp} style={{ color: "black" }}>
            <FaWhatsapp />
          </a>
          {phone}
        </p>
      </div>
      <NaviBarFooter />
    </>
  );
}
