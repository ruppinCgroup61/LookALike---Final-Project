import React, { useState, useEffect } from "react";
import { TbHanger } from "react-icons/tb";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from React Router
import "../CSS/NaviBarFooter.css";

export default function NaviBarFooter() {
  const location = useLocation();

  const getActiveIcon = (pathname) => {
    switch (true) {
      case /^\/MyWardrobe/.test(pathname):
      case /^\/UploadItem/.test(pathname):
        return "closet";
      case /^\/HomeLook/.test(pathname):
      case /^\/FCManualLook/.test(pathname):
      case /^\/select-top/.test(pathname):
      case /^\/select-bottom/.test(pathname):
      case /^\/AllLook/.test(pathname):
      case /^\/LookCalendar/.test(pathname):
      case /^\/calendar/.test(pathname):
        return "createLook";
      case /^\/SocialNetwork/.test(pathname):
      case /^\/follower-closet\/.+/.test(pathname):
        return "SocialNetwork";
      case /^\/MarketPlace/.test(pathname):
      case /^\/Ad\/\d+/.test(pathname):
      case /^\/MainPopUpC/.test(pathname):
      case /^\/AllPopUp/.test(pathname):
      case /^\/popup-details/.test(pathname):
      case /^\/MySales/.test(pathname):
        return "MainPopUpC";
      case /^\/HomePage/.test(pathname):
        return "profile";
      default:
        return "profile";
    }
  };

  const [activeIcon, setActiveIcon] = useState(
    getActiveIcon(location.pathname)
  );

  useEffect(() => {
    setActiveIcon(getActiveIcon(location.pathname));
  }, [location.pathname]);

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
        <Link to="/MainPopUpC">
          <FaShoppingCart
            color={activeIcon === "MainPopUpC" ? "#242424" : "#999999"}
          />
        </Link>
      </div>
    </div>
  );
}
