import React, { useState, useEffect } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import { CiExport } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../CSS/MyWordrobe.css";
import "../CSS/WardrobeFilters.css";
import NaviBarFooter from "./NaviBarFooter";
import WardrobeFilters from "./WardrobeFilters";
import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MyWardrobe() {
  const [selectedItem, setSelectedItem] = useState(null); // מזהה של הפריט הנבחר לצורך פתיחת הפופאפ
  const [dataFromServer, setDataFromServer] = useState(null);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [clothingTypes, setClothingTypes] = useState([]);
  const userEmail = sessionStorage.getItem("email");
  const navigateTo = useNavigate();

  console.log(userEmail);
  // קבלת הפריטים של המשתמש מהשרת
  useEffect(() => {
    fetch(`https://localhost:7215/api/Item/GetAllItemsByUser${userEmail}`, {
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
  }, []); // [] מועבר כאן כדי להראות שה-fetch צריך להתרחש רק פעם אחת בטעינה הראשונית של המרכיב

  useEffect(() => {
    // Fetch all brands and clothing types when the component mounts
    GetAllBrands();
    GetAllClothingTypes();
  }, []);

  const GetAllBrands = () => {
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
        console.log(brands);
      })
      .catch((error) => {
        console.error("Error during fetching brands:", error);
      });
  };

  const GetAllClothingTypes = () => {
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
        console.log(clothingTypes);
      })
      .catch((error) => {
        console.error("Error during fetching clothing types:", error);
      });
  };

  // Render the circular loader if still loading
  if (!(dataFromServer && clothingTypes && brands)) {
    return (
      <div className="loading-container">
        <CircularProgress color="inherit" />
      </div>
    );
  }

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
    const selectedItem = filteredClothes[index];

    // יצירת עותק של הפריט הנבחר
    const updatedItem = { ...selectedItem };

    // שינוי של is_Favorite בהתאם לערך הנוכחי שלו
    updatedItem.is_Favorite = !selectedItem.is_Favorite;

    // מציאת brand_ID התואם מתוך המותגים
    const matchedBrand = brands.find(
      (brand) => brand.brandName === selectedItem.brand
    );
    if (matchedBrand) {
      updatedItem.brand_ID = matchedBrand.id;
    }

    // מציאת clothingType_ID התואם מתוך סוגי הבגדים
    const matchedClothingType = clothingTypes.find(
      (type) => type.clothing_Type === selectedItem.clothing_Type
    );
    if (matchedClothingType) {
      updatedItem.clothingType_ID = matchedClothingType.id;
    }

    // ביצוע בקשת API לעדכון הפריט בשרת
    let api = `https://localhost:7215/api/Item/${selectedItem.item_ID}`;

    fetch(api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Catch Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(updatedItem);
        const updatedFilteredClothes = [...filteredClothes];
        updatedFilteredClothes[index] = updatedItem;
        setFilteredClothes(updatedFilteredClothes);
        setDataFromServer(updatedFilteredClothes);
      })
      .catch((error) => {
        console.error("Error during item update:", error);
      });
  };

  const ShowDetails = (item) => {
    navigateTo("/ShowDetails", { state: { item } });
  };

  return (
    <>
      {/* <div className="wardrobe_Header" id="w_header">
        <h3 className="LogoFont" id="h_header">My Wardrobe</h3>
      </div> */}
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
                <img
                  src={item.image}
                  alt={item.name}
                  onClick={() => ShowDetails(item)}
                />

                {/*לחיצה על הפלוס*/}
                <BsPlusLg className="opt" onClick={() => togglePopup(index)} />

                {/* החלף בין האייקונים בהתאם לסטייט */}
                {item.is_Favorite ? (
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
                        pathname: `/CreateAd/${item.item_ID}`,
                        search: `choosenItem=${encodeURIComponent(
                          JSON.stringify({ ...item })
                        )}`,
                      }}
                    >
                      <button
                        style={{
                          paddingLeft: 15,
                          paddingRight: 15,
                          marginBottom: 10,
                        }}
                      >
                        <CiExport className="del_sale_icon" /> For sale
                      </button>
                    </Link>
                    <button
                      style={{
                        paddingLeft: 19,
                        paddingRight: 19,
                        marginBottom: 10,
                      }}
                    >
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
          <div className="Navbar Footer">
            <NaviBarFooter />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyWardrobe;
