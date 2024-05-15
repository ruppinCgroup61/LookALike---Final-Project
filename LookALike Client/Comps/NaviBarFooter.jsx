import React from "react";
import { TbHanger } from "react-icons/tb";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";

import "../src/NaviBarFooter.css";

export default function NaviBarFooter() {
  return (
    <div className="footer">
      <div className="footer-container">
        <a>
          <IoPersonSharp /><span class="label">My Profile</span>
        </a>
        <a>
          <FaWandMagicSparkles /><span class="label">Create Outfit</span>
        </a>
        <a>
          <TbHanger /><span class="label">My Closet</span>
        </a>
        <a>
          <FaUserGroup /><span class="label">Social Network</span>
        </a>
        <a>
         <FaShoppingCart /><span class="label">Market Place</span>
        </a>
      </div>
    </div>
  );
}
