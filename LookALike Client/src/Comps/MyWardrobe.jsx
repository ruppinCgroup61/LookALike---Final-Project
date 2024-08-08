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
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MyWardrobe() {
  const [selectedItem, setSelectedItem] = useState(null); // מזהה של הפריט הנבחר לצורך פתיחת הפופאפ
  const [dataFromServer, setDataFromServer] = useState(null);
  const [filteredClothes, setFilteredClothes] = useState([]);
  // const [brands, setBrands] = useState([]);
  // const [clothingTypes, setClothingTypes] = useState([]);
  const userEmail = sessionStorage.getItem("email");
  const navigateTo = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Render the circular loader if still loading
  if (!dataFromServer) {
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

  const handleConfirmDelete = async (item) => {
    console.log(`Deleting: ${item.item_ID}`);
    await handleDelete(item);
    closeModal();
  };

  const handleDelete = async (item) => {
    try {
      const response = await fetch(
        `https://localhost:7215/api/Item/DeleteItem?itemId=${item.item_ID}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("delete succeed");
        // עדכון ה-state כדי לגרום לרינדור מחדש
      const updatedFilteredClothes = filteredClothes.filter(
        (clothingItem) => clothingItem.item_ID !== item.item_ID
      );
      setFilteredClothes(updatedFilteredClothes);
      setDataFromServer(updatedFilteredClothes);

      } else {
        console.log("delete error");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="containerW">
        <div className="header">
          <WardrobeFilters
            clothes={dataFromServer}
            setFilteredClothes={setFilteredClothes}
            flag='w'
          />
          <Link to="/UploadItem">
            <button className="UploadBTNRoute">Upload New Item</button>
          </Link>
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
                {item.status === "pending for sell" && (
                  <div className="item-status">IN MARKET</div>
                )}
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
                        disabled={item.status === "pending for sell"}
                      >
                        <CiExport id="del_sale_icon" /> For sale
                      </button>
                    </Link>
                    <button
                      style={{
                        paddingLeft: 19,
                        paddingRight: 19,
                        marginBottom: 10,
                      }}
                      disabled={item.status === "pending for sell"}
                      onClick={openModal}
                    >
                      <MdDeleteForever id="del_sale_icon" /> Delete
                    </button>
                    <Modal
                      show={isModalOpen}
                      onHide={closeModal}
                      className="delete-confirm-modal"
                    >
                      <Modal.Dialog>
  
                          <Modal.Title className="delete-confirm-title">
                            Delete
                          </Modal.Title>

                        <Modal.Body className="delete-confirm-body">
                          <p className="delete-confirm-message">
                            Are you sure ?
                          </p>
                        </Modal.Body>

                        <Modal.Footer className="delete-confirm-footer">
                          <Button
                            variant="secondary"
                            onClick={closeModal}
                            className="delete-confirm-cancel-btn"
                          >
                            Cancle
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => {
                              handleConfirmDelete(item);
                            }}
                            className="delete-confirm-delete-btn"
                          >
                            Delete
                          </Button>
                        </Modal.Footer>
                      </Modal.Dialog>
                    </Modal>
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