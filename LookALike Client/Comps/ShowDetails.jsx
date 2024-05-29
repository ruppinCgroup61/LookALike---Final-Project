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
      <div className="ad_container">
        <img src={item.image} alt={item.name} />
        <h3>{item.name.toUpperCase()}</h3>
        <p>{item.size}</p>
        <br />
      </div>
      {/* Close button */}
      <div className="CloseAd" style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}>
        <FaTimes onClick={closeAd} size={24} />
      </div>
      <div className="Navbar Footer">
        <NaviBarFooter />
      </div>
    </>
  );
}
