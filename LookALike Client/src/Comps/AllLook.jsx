import React, { useState, useEffect } from 'react';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { BsPlusLg } from 'react-icons/bs';
import { CiExport } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import NaviBarFooter from './NaviBarFooter';
import "../CSS/AllLook.css"; // קובץ CSS חדש

const AllLook = (props) => {
  const userEmail = sessionStorage.getItem("email");
  const [looks, setLooks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
// 'https://localhost:7215/api/ManualLook/GetLooksDetails/yakirco0412%40gmail.com' \
  useEffect(() => {
    fetch(`https://localhost:7215/api/ManualLook/GetLooksDetails/${userEmail}`, {
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
      setLooks(data);
    })
    .catch((error) => {
      console.error("There was a problem with fetch operation:", error);
    });
  }, []);

 

  return (
    <div className="app-container">
      <div className="Upload_Header3">
        <h1 className='LogoFont3'>LookALike</h1>
      </div>
      <div >
      <h1 className='HeaderForAllLook'>ALL MY LOOKS</h1> {/* הכותרת מעל הצגת הלוקים */}
      </div>
      <div className="clothing-list">
        {looks.map((look, index) => (
          <div key={index} className="clothing-item">
            <div className="clothing-image">
              <img src={look.topSelection_Image} alt="Top" />
              <img src={look.buttomSelection_Image} alt="Bottom" />

              {/* <BsPlusLg className="opt" onClick={() => togglePopup(index)} /> */}

              {/* {look.is_Favorite ? (
                <IoIosHeart className="fav" onClick={() => toggleFavorite(index)} />
              ) : (
                <IoIosHeartEmpty className="fav" onClick={() => toggleFavorite(index)} />
              )} */}
{/* 
              {selectedItem === index && (
                <div className="popup">
                  <Link to={`/CreateAd/${look.lookId}`}>
                    <button style={{ paddingLeft: 15, paddingRight: 15, marginBottom: 10 }}>
                      <CiExport className="del_sale_icon" /> For sale
                    </button>
                  </Link>
                  <button style={{ paddingLeft: 19, paddingRight: 19, marginBottom: 10 }}>
                    <MdDeleteForever className="del_sale_icon" /> Delete
                  </button>
                </div>
              )} */}
            </div>
            <div className="clothing-details">
              <p>
                 {look.top_Item_Name}  &   {look.bottom_Item_Name} 
                
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='bottom-div'>
        <NaviBarFooter />
      </div>
    </div>
  );
};

export default AllLook;
