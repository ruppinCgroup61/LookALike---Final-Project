import React, { useState } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import { CiExport } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import "../src/MyWordrobe.css";
import "../src/WardrobeFilters.css";
import NaviBarFooter from "./NaviBarFooter";
import WardrobeFilters from "./WardrobeFilters";

function MyWardrobe(props) {
  const [selectedItem, setSelectedItem] = useState(null); // מזהה של הפריט הנבחר לצורך פתיחת הפופאפ
  const [favorites, setFavorites] = useState([]); // סטייט לאייקונים מועדפים
  const [filteredClothes, setFilteredClothes] = useState(props.clothes);

  // לחיצה על ה+
  const togglePopup = (index) => {
    if (selectedItem === index) {
      // אם הפריט כבר פתוח, סגור אותו
      setSelectedItem(null);
    } else {
      // אחרת, פתח את הפריט הנבחר
      setSelectedItem(index);
    }
  };

  // הכנסה והוצאה ממועדפים
  const toggleFavorite = (index) => {
    const newFavorites = [...favorites]; // עותק חדש של רשימת המועדפים
    if (newFavorites.includes(index)) {
      // אם המועדף כבר קיים, מחק אותו
      const indexToRemove = newFavorites.indexOf(index);
      newFavorites.splice(indexToRemove, 1);
    } else {
      // אם המועדף אינו קיים, הוסף אותו
      newFavorites.push(index);
    }
    // עדכן את הסטייט
    setFavorites(newFavorites);
  };

  return (
    <>
      <div className="containerW">
        <div className="header">
          <WardrobeFilters
            clothes={props.clothes}
            setFilteredClothes={setFilteredClothes}
          />
        </div>
        <div className="clothing-list">
          {filteredClothes.map((item, index) => (
            <div key={index} className="clothing-item">
              <div className="clothing-image">
                <img src={item.image} alt={item.name} />

                {/*לחיצה על הפלוס*/}
                <BsPlusLg className="opt" onClick={() => togglePopup(index)} />

                {/* החלף בין האייקונים בהתאם לסטייט */}
                {favorites.includes(index) ? (
                  <IoIosHeart
                    className="fav"
                    onClick={() => toggleFavorite(index)}
                  />
                ) : (
                  <IoIosHeartEmpty
                    className="fav"
                    onClick={() => toggleFavorite(index)}
                  />
                )}

                {/* תצוגת הפופאפ רק עבור הפריט שנבחר */}
                {selectedItem === index && (
                  <div className="popup">
                    <Link
                      to={{
                        pathname: `/createad/${item.id}`,
                        search: `choosenItem=${encodeURIComponent(JSON.stringify({ ...item }))}`,
                      }}
                    >
                      <button>
                        <CiExport className="del_sale_icon" /> For sale
                      </button>
                    </Link>
                    <button>
                      <MdDeleteForever className="del_sale_icon" /> Delete
                    </button>
                  </div>
                )}
              </div>
              <div className="clothing-details">
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Brand:</strong> {item.brand}
                </p>
              </div>
            </div>
          ))}



        </div>
        <div className="bottom-div">
          <NaviBarFooter />
        </div>
      </div>
    </>
  );
}

export default MyWardrobe;
