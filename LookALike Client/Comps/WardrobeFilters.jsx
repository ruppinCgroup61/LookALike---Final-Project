import { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";

export default function WardrobeFilters({ clothes, setFilteredClothes }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterClick = (filter) => {
    console.log("33");
    setActiveFilter(filter);
    if (filter === "All") {
      setFilteredClothes(clothes);
    } else {
      const filteredItems = clothes.filter(
        (item) => item.clothing_Type === filter || item.clothingType_Name === filter
      );
      setFilteredClothes(filteredItems);
      console.log(filteredItems);
    }
  };

  return (
    <>
      <CgMenuGridR className="menu_icon" />
      <span
        className={`menu_filters ${
          activeFilter === "All" ? "active_filter" : ""
        }`}
        onClick={() => handleFilterClick("All")}
      >
        All
      </span>
      <span
        className={`menu_filters ${
          activeFilter === "T-Shirt" ? "active_filter" : ""
        }`}
        onClick={() => handleFilterClick("T-Shirt")}
      >
        Shirts
      </span>
      <span
        className={`menu_filters ${
          activeFilter === "Jeans" ? "active_filter" : ""
        }`}
        onClick={() => handleFilterClick("Jeans")}
      >
        Jeans
      </span>
      <span
        className={`menu_filters ${
          activeFilter === "Jacket" ? "active_filter" : ""
        }`}
        onClick={() => handleFilterClick("Jacket")}
      >
        Jackets
      </span>
      <span
        className={`menu_filters ${
          activeFilter === "Dress" ? "active_filter" : ""
        }`}
        onClick={() => handleFilterClick("Dress")}
      >
        Dress
      </span>
    </>
  );
}
