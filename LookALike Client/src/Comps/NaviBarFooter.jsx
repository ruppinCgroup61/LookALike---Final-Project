import React, { useState, useEffect } from "react";
import { TbHanger } from "react-icons/tb";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from React Router
import "../CSS/NaviBarFooter.css";

export default function NaviBarFooter() {
  const [activeIcon, setActiveIcon] = useState("profile");
  const location = useLocation();

  useEffect(() => {
    // Get the pathname from location object
    const pathname = location.pathname;

    // Set active icon based on the pathname
    switch (true) {
      case /^\/MyWardrobe/.test(pathname):
      case /^\/UploadItem/.test(pathname):
        setActiveIcon("closet");
        break;
      case /^\/HomeLook/.test(pathname):
      case /^\/FCManualLook/.test(pathname):
      case /^\/select-top/.test(pathname):
      case /^\/select-bottom/.test(pathname):
      case /^\/AllLook/.test(pathname):
      case /^\/LookCalendar/.test(pathname):
        setActiveIcon("createLook");
        break;
      case /^\/SocialNetwork/.test(pathname):
        setActiveIcon("SocialNetwork");
        break;
      case /^\/MarketPlace/.test(pathname):
        setActiveIcon("MarketPlace");
        break;
      case /^\/HomePage/.test(pathname):
        setActiveIcon("profile");
        break;
      case /^\/Ad\/\d+/.test(pathname):
        setActiveIcon("MarketPlace");
        break;
    }
  }, [location.pathname]); // Re-run effect when pathname changes

  const handleClick = (icon) => {
    setActiveIcon(icon);
  };

  return (
    <div className="footer">
      <div className="footer-container">
        <Link to="/HomePage">
          <IoPersonSharp
            color={activeIcon === "profile" ? "#242424" : "#999999"}
          />
        </Link>
        <Link to="/HomeLook">
          <FaWandMagicSparkles
            color={activeIcon === "createLook" ? "#242424" : "#999999"}
          />
        </Link>
        <Link to="/MyWardrobe">
          <TbHanger color={activeIcon === "closet" ? "#242424" : "#999999"} />
        </Link>
        <Link to="/SocialNetwork">
          <FaUserGroup
            color={activeIcon === "SocialNetwork" ? "#242424" : "#999999"}
          />
        </Link>
        <Link to="/MarketPlace">
          <FaShoppingCart
            color={activeIcon === "MarketPlace" ? "#242424" : "#999999"}
          />
        </Link>
      </div>
    </div>
  );
}
