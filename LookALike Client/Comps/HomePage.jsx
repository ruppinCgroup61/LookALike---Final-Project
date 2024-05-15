import React from 'react';
import '../src/HomePage.css';
import { faUser, faTshirt, faSuitcase, faUsers, faStore, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import NaviBarFooter from './NaviBarFooter';

export default function HomePage() {
  const [value, setValue] = React.useState('profile');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      <div className="top-div">
        <div className="user-circle">
        </div>
        <h1 className="welcome-text">Welcome Shir Turgman</h1>
        <div>
        <FontAwesomeIcon icon={faBell} style={{ fontSize: '30px' }} /> {/* Notification icon */}
        </div>
      </div>
      <div className="center-div">
        <div className="block">
          <div className="overlay"></div>
          <p>Enter Your Wardrobe</p>
        </div>
        <div className="block">
          <div className="overlay"></div>
          <p>Enter Market Place</p>
        </div>
        <div className="block">
          <div className="overlay"></div>
          <p>Enter @BarBelisha Wardrobe</p>
        </div>
        <div className="block">
          <div className="overlay"></div>
          <p>Create New Look</p>
        </div>
      </div>
      {/* <div className='logo'>
        <img src="/Images/kolav.png" alt="" />
      </div> */}
      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </div>
  );
}
