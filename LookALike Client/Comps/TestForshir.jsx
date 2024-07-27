import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../src/WardrobeFilters.css";
import NaviBarFooter from './NaviBarFooter';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../src/CustomCarousel.css'; // קובץ CSS מותאם אישית

const AllLook = (props) => {
  const userEmail = sessionStorage.getItem("email");
  const [looks, setLooks] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:7215/api/ManualLook?userEmail=${userEmail}`, {
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
      console.log(data);
      setLooks(data);
    })
    .catch((error) => {
      console.error("There was a problem with fetch operation:", error);
    });
  }, []);

  const renderLooks = () => {
    return looks.map((look) => (
      <div key={look.lookId}>
        <img
          className="look-image"
          src={look.topSelection_Image}
          alt="Top"
        />
        <img
          className="look-image"
          src={look.buttomSelection_Image}
          alt="Bottom"
        />
      </div>
    ));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <div className="slick-next">Next</div>,
    prevArrow: <div className="slick-prev">Prev</div>,
  };

  return (
    <>
      <div className="app-container">
        <div className="Upload_Header3">
          <h1 className='LogoFont3'>LookALike</h1>
        </div>
        <h1 className='HeaderForLook'>ALL MY LOOKS</h1>
        <Slider {...settings}>
          {renderLooks()}
        </Slider>
        <div className='bottom-div'>
          <NaviBarFooter />
        </div>
      </div>
    </>
  );
};

export default AllLook;
