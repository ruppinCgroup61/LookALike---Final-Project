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


  // קבלת הפריטים של המשתמש מהשרת
  useEffect(() => {
    fetch('https://localhost:7215/api/Item/yakirco0412@gmail.com', {
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

  // הצגת הודעת טעינה אם הנתונים עדיין לא נטענו
  if (!dataFromServer) {
    return <div>Loading...</div>;
  };

  console.log("1");
  console.log(dataFromServer);
  console.log("shir");
  console.log(dataFromServer[0].image);

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

    // fetch('https://localhost:7215/api/User', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(selecetItem)
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Catch Error');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //     if (data === -1) {
    //       console.log('Registration failed');
    //       setEmailAlreadyExsistAlert(true);

    //     }
    //     if (data === 1) {
    //       console.log('Registration successfull');
    //       setFirstNameForPopup(data.firstName);
    //       setRegistrationSuccess(true);
    //       navigateTo("/logIn")
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error during registration:', error);
    //   });
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
                        pathname: `/CreateAd/${item.id}`,
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
          <NaviBarFooter /> {/* הצגת הסרגל התחתון */}
        </div>
      </div>
    </>
  );
}

export default MyWardrobe;
