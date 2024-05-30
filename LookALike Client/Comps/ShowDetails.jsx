import { useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NaviBarFooter from "./NaviBarFooter";

export default function ShowDetails() {
  const navigateTo = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};

  console.log(item);

  const closeAd = () => {
    navigateTo("/MyWardrobe");
  };

  return (
    <>
      <div className="ad_container" id="item_details_container">
        <img src={item.image} alt={item.name} />
        <h2 style={{marginBottom: 18, marginTop: 28}}>
          {item.name.toUpperCase()}
        </h2>
        <p><strong>Brand:</strong> {item.brand}</p>
        <p><strong>Type:</strong> {item.clothing_Type}</p>
        <p><strong>Season:</strong> {item.season}</p>
        <p><strong>Size:</strong> {item.size}</p>
        <p><strong>Cost:</strong> {item.price}$</p>
      </div>
      {/* Close button */}
      <div
        className="CloseAd"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
        }}
      >
        <FaTimes onClick={closeAd} size={24} />
      </div>
      <div className="Navbar Footer">
        <NaviBarFooter />
      </div>
    </>
  );
}
