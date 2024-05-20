import React, { useState, useEffect } from "react";
import "../src/HomePage.css";
import {
  faUser,
  faTshirt,
  faSuitcase,
  faUsers,
  faStore,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import NaviBarFooter from "./NaviBarFooter";

export default function HomePage() {
  const [userList, setUserList] = useState([]);
  const userEmail = sessionStorage.getItem("email"); // Retrieve email from session storage
  //const [user, setUser] = useState(); // State to store the user data


  // Fetch user list from the server when the component mounts
  useEffect(() => {
    fetch("https://localhost:7215/api/User", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserList([...data]); // Update the userList state with the fetched data
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // הצגת הודעת טעינה אם הנתונים עדיין לא נטענו
  if (!userList) {
    return <div>Loading...</div>;
  }
  console.log(userList);

  let u = "";
  // Function to find the user by email address
  if (userList && userList.length > 0) {
    u = userList.find((user) => user.email === userEmail);
    console.log("sss");
    console.log(u.image);
  }

  return (
    <div className="container">
      <div className="top-div">
        <div className="user-circle">
          <img src={u.image} alt="User" />
        </div>
        {/* Display welcome message with user's first name and last name */}
        <h1 className="welcome-text">
          Welcome {u.firstName} {u.lastName}
        </h1>
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
      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </div>
  );
}
