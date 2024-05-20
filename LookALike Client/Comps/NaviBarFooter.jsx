import React, { useState, useEffect } from "react";
import { TbHanger } from "react-icons/tb";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from React Router

import "../src/NaviBarFooter.css";

export default function NaviBarFooter() {
  const [activeIcon, setActiveIcon] = useState("profile");
  const location = useLocation();

  useEffect(() => {
    // Get the pathname from location object
    const pathname = location.pathname;

    // Set active icon based on the pathname
    switch (pathname) {
      case "/MyWardrobe":
        setActiveIcon("closet");
        break;
      case "/UploadItem":
        setActiveIcon("createOutfit");
        break;
      case "/social-network":
        setActiveIcon("socialNetwork");
        break;
      case "/MarketPlace":
        setActiveIcon("marketPlace");
        break;
      default:
        setActiveIcon("profile");
    }
  }, [location.pathname]); // Re-run effect when pathname changes

  const handleClick = (icon) => {
    setActiveIcon(icon);
  };

  return (
    <div className="footer">
      <div className="footer-container">
        <Link to="/HomePage">
          <IoPersonSharp color={activeIcon === "profile" ? "#242424" : "#999999"} />
        </Link>
        <Link to="/UploadItem">
          <FaWandMagicSparkles color={activeIcon === "createOutfit" ? "#242424" : "#999999"} />
        </Link>
        <Link to="/MyWardrobe">
          <TbHanger color={activeIcon === "closet" ? "#242424" : "#999999"} />
        </Link>
        <Link to="/social-network">
          <FaUserGroup color={activeIcon === "socialNetwork" ? "#242424" : "#999999"} />
        </Link>
        <Link to="/MarketPlace">
          <FaShoppingCart color={activeIcon === "marketPlace" ? "#242424" : "#999999"} />
        </Link>
      </div>
    </div>
  );
}
