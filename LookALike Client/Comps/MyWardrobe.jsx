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
import CircularProgress from "@mui/material/CircularProgress";


function MyWardrobe() {
  const [selectedItem, setSelectedItem] = useState([]); // מזהה של הפריט הנבחר לצורך פתיחת הפופאפ
  const [favorites, setFavorites] = useState([]); // סטייט לאייקונים מועדפים
  const [dataFromServer, setDataFromServer] = useState(null);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [clothingTypes, setClothingTypes] = useState([]);
  //const userEmail = encodeURIComponent(sessionStorage.getItem("email"));
  let userEmail = sessionStorage.getItem("email");

  const [ItemToUpdate, setItemToUpdate] = useState({
    item_ID: 0,
    item_Code: 0,
    name: '',
    image: 'null',
    color_Code: '',
    season: '',
    size: '',
    brand_ID: 0,
    price: 0,
    is_Favorite: false,
    status: 'live',
    user_Email: userEmail,
    clothingType_ID: 0,
  });

  console.log(userEmail);
  // קבלת הפריטים של המשתמש מהשרת
  useEffect(() => {
    fetch(`https://localhost:7215/api/Item/${userEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // ניתן לעדכן את ה-state או לעשות פעולות נדרשות עם הנתונים שהתקבלו
        setDataFromServer([...data]);
        setFilteredClothes([...data]);
      })
      .catch(error => {
        console.error('There was a problem with fetch operation:', error);
      });

  }, []); // [] מועבר כאן כדי להראות שה-fetch צריך להתרחש רק פעם אחת בטעינה הראשונית של המרכיב

  useEffect(() => {
    // Fetch all brands and clothing types when the component mounts
    GetAllBrands();
    GetAllClothingTypes();
  }, []);

  const GetAllBrands = () => {
    fetch('https://localhost:7215/api/Brand', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Catch Error');
        }
        return response.json();
      })
      .then(data => {
        setBrands(data);
        console.log(brands);
      })
      .catch(error => {
        console.error('Error during fetching brands:', error);
      });
  };

  const GetAllClothingTypes = () => {
    fetch('https://localhost:7215/api/ClothingType', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Catch Error');
        }
        return response.json();
      })
      .then(data => {
        setClothingTypes(data);
        console.log(clothingTypes);

      })
      .catch(error => {
        console.error('Error during fetching clothing types:', error);
      });
  };



   // Render the circular loader if still loading
   if (!(dataFromServer&&clothingTypes&&brands)) {
    return (
      <div className="loading-container">
        <CircularProgress  color="inherit"/>
        {/* <div className="Loading">Your wardrobe is in preparation....</div> */}
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
    const newFavorites = [...favorites];
    const selectedItem = dataFromServer[index];
    
    // Create a copy of the selected item
    const updatedItem = { ...selectedItem };
  
    // Toggle is_Favorite based on its current value
    updatedItem.is_Favorite = !updatedItem.is_Favorite;
  
    // Find matching brand_ID from brands
    const matchedBrand = brands.find((brand) => brand.brandName === selectedItem.brand);
    if (matchedBrand) {
      updatedItem.brand_ID = matchedBrand.id;
    }
  
    // Find matching clothingType_ID from clothingTypes
    const matchedClothingType = clothingTypes.find((type) => type.clothing_Type === selectedItem.clothing_Type);
    if (matchedClothingType) {
      updatedItem.clothingType_ID = matchedClothingType.id;
    }
  
    // Update the state with the updated item
    setItemToUpdate(updatedItem);
  
    // Update the favorites array based on the updated item's index
    if (newFavorites.includes(index)) {
      const indexToRemove = newFavorites.indexOf(index);
      newFavorites.splice(indexToRemove, 1);
    } else {
      newFavorites.push(index);
    }
    setFavorites(newFavorites);
  
    // Perform API request to update the item on the server
    let api = `https://localhost:7215/api/Item/${selectedItem.item_ID}`;
    fetch(api, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Catch Error');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error during item update:', error);
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
                        search: `choosenItem=${encodeURIComponent(JSON.stringify({ ...item }))}`,
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
          <div className='Navbar Footer'>
            <NaviBarFooter />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyWardrobe;
