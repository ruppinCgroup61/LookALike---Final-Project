import React, { useState, useEffect } from 'react';
import '../src/HomePage.css';
import { faUser, faTshirt, faSuitcase, faUsers, faStore, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import NaviBarFooter from './NaviBarFooter';

export default function HomePage() {
  const [value, setValue] = useState('profile');
  const [userList, setUserList] = useState([]);
  const userEmail = sessionStorage.getItem('email'); // Retrieve email from session storage
  const [user, setUser] = useState(null); // State to store the user data
  const [UserImg, setUserImg] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to fetch user list from the server
  const getAllUsers = () => {
    fetch('https://localhost:7215/api/User', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        setUserList(data); // Update the userList state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  // Fetch user list from the server when the component mounts
  useEffect(() => {
    getAllUsers();
  }, []);

  const ImageShow = (image) => {
    setUserImg(image);
  };

  // Function to find the user by email address
  useEffect(() => {
    if (userEmail && userList && userList.length > 0) {
      const foundUser = userList.find(user => user.email === userEmail);
      setUser(foundUser);
      if (foundUser) {
        ImageShow(foundUser.image); // Call ImageShow with the user's image
      }
    }
  }, [userEmail, userList]);

  // Log the current value of UserImg whenever it changes
  useEffect(() => {
    console.log(UserImg);
  }, [UserImg]);




  return (
    <div className="container">
      <div className="top-div">
        <div className="user-circle">
          {user && UserImg && <img src={`data:image/png;base64,${UserImg}`} alt="User" />}
        </div>
        {/* Display welcome message with user's first name and last name */}
        {user && <h1 className="welcome-text">Welcome {user.firstName} {user.lastName}</h1>}
      </div>
      <div className="center-div">
        <div className="block">
          <div className="overlay"></div>
          <p onClick={getAllUsers}>Enter Your Wardrobe</p>
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
      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </div>
  );
}
