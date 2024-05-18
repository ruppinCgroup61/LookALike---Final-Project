import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../src/CSSc/WardrobeFilters.css";
import WardrobeFilters from "./WardrobeFilters";
import NaviBarFooter from "./NaviBarFooter";

export default function MarketPlace(props) {

  const [filteredClothes, setFilteredClothes] = useState(props.ads);
  const navigateTo = useNavigate();

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
            clothes={props.ads}
            setFilteredClothes={setFilteredClothes}
          />
        </div>
        <div className="clothing-list">
          {filteredClothes.map((item, index) => (
            <div key={index} className="clothing-item">
              <div className="clothing-image">
                <img src={item.photo} alt={item.name} onClick={() => Showad(item)} />
              </div>
              <div className="clothing-details">
                <p>
                  <strong>
                    {item.color.toUpperCase()} {item.name.toUpperCase()} -{" "}
                    {item.price}$
                  </strong>
                </p>
              </div>
            </div>
          ))}
          <NaviBarFooter />
        </div>
      </div>
    </>
  );
}
