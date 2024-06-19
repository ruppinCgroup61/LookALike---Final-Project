import { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";

import FilterPopup from "./FilterPopup";

export default function WardrobeFilters({ clothes, setFilteredClothes }) {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterClick = (filter) => {
    console.log("33");
    setActiveFilter(filter);
    if (filter === "All") {
      setFilteredClothes(clothes);
    } else {
      const filteredItems = clothes.filter(
        (item) =>
          item.clothing_Type === filter || item.clothingType_Name === filter
      );
      setFilteredClothes(filteredItems);
      console.log(filteredItems);
    }
  };

  return (
    <>
      <CgMenuGridR className="filter_icon" onClick={handleOpen} />
      <FilterPopup open={open} onClose={handleClose} clothes={clothes} setFilteredClothes={setFilteredClothes}/>
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
