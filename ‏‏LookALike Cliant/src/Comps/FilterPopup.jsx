import React from "react";
import {
  Drawer,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import "../CSS/FilterPopup.css";

const FilterPopup = ({ open, onClose, clothes, setFilteredClothes }) => {
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    let filteredClothes = clothes;

    if (value === "option1") {
      filteredClothes = clothes.filter((item) => item.is_Favorite === true);
    } else if (value === "option2") {
      filteredClothes = clothes.filter(
        (item) => item.status === "pending for sell"
      );
    }

    setFilteredClothes(filteredClothes);
  };

  const handleClearFilter = () => {
    setSelectedOption(""); // מסיר את הבחירה הנוכחית
    setFilteredClothes(clothes); // מחזיר את כל הפריטים
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className="filter-sidebar">
        <h2>Filters</h2>
        <RadioGroup
          name="filters"
          value={selectedOption}
          onChange={handleFilterChange}
        >
          <FormControlLabel
            value="option1"
            control={
              <Radio
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
            value="option2"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "rgb(143, 104, 92)", // צבע של הסימון עצמו כשהוא מסומן
                  },
                }}
              />
            }
            label="For sale"
          />
          {/* <FormControlLabel
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
        /> */}
        </RadioGroup>
        <div className="filter-sidebar-actions">
          <Button
            onClick={handleClearFilter}
            className="filter-sidebar-button"
            style={{ color: "rgb(143, 104, 92)" }}
          >
            Clear
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
