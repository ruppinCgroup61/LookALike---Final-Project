import React, { useState, useEffect } from "react";
import "../src/HomePage.css";
import NaviBarFooter from "./NaviBarFooter";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from React Router


export default function HomePage() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const userEmail = sessionStorage.getItem("email"); // Retrieve email from session storage

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
      })
      .finally(() => {
        setLoading(false); // Set loading to false regardless of success or failure
      });
  }, []);

  // Set a timeout to change the loading state after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 50000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  // Render the circular loader if still loading
  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress  color="inherit"/>
        {/* <div className="Loading">Your wardrobe is in preparation....</div> */}
      </div>
    );
  }

  let u = "";
  // Function to find the user by email address
  if (userList && userList.length > 0) {
    u = userList.find((user) => user.email === userEmail);
    console.log("sss");
    console.log(u.image);
  }

  // Render the page content once loading is complete
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
        <Link to="/MyWardrobe">
          <div className="block">
            <div className="overlay"></div>
            <p>Enter Your Wardrobe</p>
          </div>
        </Link>
        <div className="block">
          <Link to="/MarketPlace">
            <div className="overlay"></div>
            <p>Enter Market Place</p>
          </Link>
        </div>
        <div className="block">
          <div className="overlay"></div>
          <p>Enter @BarBelisha Wardrobe</p>
        </div>
        <div className="block">
          <Link to="/FCManualLook">
            <div className="overlay"></div>
            <p>Create New Look</p>
          </Link>
        </div>
      </div>
      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </div>
  );
}
