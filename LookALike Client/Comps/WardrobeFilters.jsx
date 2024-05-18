import { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";

export default function WardrobeFilters({ clothes, setFilteredClothes }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setFilteredClothes(clothes);
    } else {
      const filteredItems = clothes.filter((item) => item.name === filter);
      setFilteredClothes(filteredItems);
    }
  };

  return (
    <>
      <CgMenuGridR className="menu_icon" />
      <span
        className={`menu_filters ${activeFilter === "All" ? "active_filter" : ""}`}
        onClick={() => handleFilterClick("All")}
      >
        All
      </span>
      <span
        className={`menu_filters ${activeFilter === "Shirt" ? "active_filter" : ""}`}
        onClick={() => handleFilterClick("Shirt")}
      >
        Shirts
      </span>
      <span
        className={`menu_filters ${activeFilter === "Pants" ? "active_filter" : ""}`}
        onClick={() => handleFilterClick("Pants")}
      >
        Pants
      </span>
      <span
        className={`menu_filters ${activeFilter === "Jackets" ? "active_filter" : ""}`}
        onClick={() => handleFilterClick("Jackets")}
      >
        Jackets
      </span>
      <span
        className={`menu_filters ${activeFilter === "Coat" ? "active_filter" : ""}`}
        onClick={() => handleFilterClick("Coat")}
      >
        Coat
      </span>
    </>
  );
}