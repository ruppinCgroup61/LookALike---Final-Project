import React from "react";
import { Drawer, Button, Checkbox, FormControlLabel } from "@mui/material";
import "../CSS/FilterPopup.css";

const FilterPopup = ({ open, onClose, clothes, setFilteredClothes }) => {
  const [filters, setFilters] = React.useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });

    if (event.target.name === "option1") {
      handleFavoritesChange(event.target.checked);
    }
  };

  const handleFavoritesChange = (isChecked) => {
    console.log("Favorites clicked");
    if (isChecked) {
      // קבלת מערך של כל הפריטים המועדפים
      const favs = clothes.filter((item) => item.is_Favorite == true);
      setFilteredClothes(favs);
    }
    // אם ביטלו את הבחירה במועדפים נחזיר לתצוגה רגילה
    else {
      setFilteredClothes(clothes);
    }
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className="filter-sidebar">
        <h2>Filter Options</h2>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.option1}
              onChange={handleFilterChange}
              name="option1"
              sx={{
                "&.Mui-checked": {
                  color: "rgb(143, 104, 92)", // צבע של הסימון עצמו כשהוא מסומן
                },
              }}
            />
          }
          label="Favorites"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.option2}
              onChange={handleFilterChange}
              name="option2"
              sx={{
                "&.Mui-checked": {
                  color: "rgb(143, 104, 92)", // צבע של הסימון עצמו כשהוא מסומן
                },
              }}
            />
          }
          label="Option 2"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.option3}
              onChange={handleFilterChange}
              name="option3"
              sx={{
                "&.Mui-checked": {
                  color: "rgb(143, 104, 92)", // צבע של הסימון עצמו כשהוא מסומן
                },
              }}
            />
          }
          label="Option 3"
        />
        <div className="filter-sidebar-actions">
          <Button
            onClick={onClose}
            className="filter-sidebar-button"
            style={{ color: "rgb(143, 104, 92)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              /* Handle Apply Filters */ onClose();
            }}
            className="filter-sidebar-button"
            style={{ color: "rgb(143, 104, 92)" }}
          >
            Apply
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterPopup;
