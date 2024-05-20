import React, { useState, useEffect } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import { CiExport } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import "../src/MyWordrobe.css";
import "../src/WardrobeFilters.css";
import NaviBarFooter from "./NaviBarFooter";
import WardrobeFilters from "./WardrobeFilters";

function MyWardrobe() {
  const [selectedItem, setSelectedItem] = useState([]); // מזהה של הפריט הנבחר לצורך פתיחת הפופאפ
  const [favorites, setFavorites] = useState([]); // סטייט לאייקונים מועדפים
  const [dataFromServer, setDataFromServer] = useState(null);
  const [filteredClothes, setFilteredClothes] = useState([]);
  let userEmail = sessionStorage.getItem("email");

  const [brands, setBrands] = useState([]);
  const [clothingTypes, setClothingTypes] = useState([]);

  useEffect(() => {
    // קבלת הפריטים של המשתמש מהשרת
    fetch(`https://localhost:7215/api/Item/${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // ניתן לעדכן את ה-state או לעשות פעולות נדרשות עם הנתונים שהתקבלו
        setDataFromServer([...data]);
        setFilteredClothes([...data]);
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });

    // קבלת קוד המותג מהשרת
    fetch("https://localhost:7215/api/Brand", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Catch Error");
        }
        return response.json();
      })
      .then((data) => {
        setBrands(data);
      })
      .catch((error) => {
        console.error("Error during fetching brands:", error);
      });

    // קבלת קוד סוג הפריט מהשרת
    fetch("https://localhost:7215/api/ClothingType", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Catch Error");
        }
        return response.json();
      })
      .then((data) => {
        setClothingTypes(data);
      })
      .catch((error) => {
        console.error("Error during fetching clothing types:", error);
      });
  }, []); // [] מועבר כאן כדי להראות שה-fetch צריך להתרחש רק פעם אחת בטעינה הראשונית של המרכיב

  // הצגת הודעת טעינה אם הנתונים עדיין לא נטענו
  if (!dataFromServer) {
    return <div>Loading...</div>;
  }

  console.log("1");
  console.log(dataFromServer);
  console.log("shir");
  console.log(dataFromServer[0].image);
  console.log("shir");
  console.log(brands);
  console.log("shir");
  console.log(clothingTypes);

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
  const toggleFavorite = (index, i) => {
    let favItem = i;
    
    const newFavorites = [...favorites]; // עותק חדש של רשימת המועדפים
    if (newFavorites.includes(index)) {
      favItem.is_Favorite = false;
      console.log(favItem.is_Favorite);
      let brandResult = brands.find(obj => obj.brandName === favItem.brand);
      let clothResult = clothingTypes.find(obj => obj.clothing_Type === favItem.clothing_Type);
      // הוספת השדות הרצויים
      favItem.brand_ID = brandResult.id;
      favItem.clothingType_ID = clothResult.id;
      // מחיקת השדות המיותרים
      delete favItem.brand;
      delete favItem.clothing_Type;
      console.log(brandResult);
      console.log(clothResult);
      // אם המועדף כבר קיים, מחק אותו
      const indexToRemove = newFavorites.indexOf(index);
      newFavorites.splice(indexToRemove, 1);
    } else {
      // אם המועדף אינו קיים, הוסף אותו
      favItem.is_Favorite = true;
      let brandResult = brands.find(obj => obj.brandName === favItem.brand);
      let clothResult = clothingTypes.find(obj => obj.clothing_Type === favItem.clothing_Type);
      // הוספת השדות הרצויים
      favItem.brand_ID = brandResult.id;
      favItem.clothingType_ID = clothResult.id;
      // מחיקת השדות המיותרים
      delete favItem.brand;
      delete favItem.clothing_Type;
      console.log(brandResult);
      console.log(clothResult);
      console.log(favItem);
      newFavorites.push(index);
    }
    // עדכן את הסטייט
    setFavorites(newFavorites);

    // עדכון מועדף/לא מועדף בשרת
    fetch(`https://localhost:7215/api/Item/${favItem.item_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Catch Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data === -1) {
          console.log("Change failed");
        }
        if (data === 1) {
          console.log("Changed successfull");
        }
      })
      .catch((error) => {
        console.error("Error during change:", error);
      });
  };

  return (
    <>
      <div className="containerW">
        <div className="header">
          <WardrobeFilters
            clothes={dataFromServer}
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
                    onClick={() => toggleFavorite(index, item)}
                  />
                ) : (
                  <IoIosHeartEmpty
                    className="fav"
                    onClick={() => toggleFavorite(index, item)}
                  />
                )}

                {/* תצוגת הפופאפ רק עבור הפריט שנבחר */}
                {selectedItem === index && (
                  <div className="popup">
                    <Link
                      to={{
                        pathname: `/CreateAd/${item.item_ID}`,
                        search: `choosenItem=${encodeURIComponent(
                          JSON.stringify({ ...item })
                        )}`,
                      }}
                    >
                      <button style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <CiExport className="del_sale_icon" /> For sale
                      </button>
                    </Link>
                    <button style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <MdDeleteForever className="del_sale_icon" /> Delete
                    </button>
                  </div>
                )}
              </div>
              <div className="clothing-details">
                <p>
                  <strong>Type:</strong> {item.clothing_Type}
                </p>
                <p>
                  <strong>Brand:</strong> {item.brand}
                </p>
              </div>
            </div>
          ))}
          <NaviBarFooter /> {/* הצגת הסרגל התחתון */}
        </div>
      </div>
    </>
  );
}

export default MyWardrobe;
