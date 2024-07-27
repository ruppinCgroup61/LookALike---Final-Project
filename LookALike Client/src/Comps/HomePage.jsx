import React, { useState, useEffect } from "react";
import "../CSS/HomePage.css";
import NaviBarFooter from "../Comps/NaviBarFooter";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = sessionStorage.getItem("email");

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
        setUserList([...data]);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);


  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  let u = "";
  if (userList && userList.length > 0) {
    u = userList.find((user) => user.email === userEmail);
  }

  return (
    <div className="container">
      
      <div className="top-div">
        <div className="user-circle">
          <img src={u.image} alt="User" />
        </div>
        <h1 className="welcome-text">
          Welcome {u.firstName} {u.lastName}
        </h1>
      </div>
      <div className="center-div">
        <Link to="/MyWardrobe">
          <div className="block">
            <div className="overlay"></div>
            <p className="titleHP">Enter Your Wardrobe</p>
          </div>
        </Link>
        <div className="block">
          <Link to="/UploadItem">
            <div className="overlay"></div>
            <p className="titleHP">Add New Clothing</p>
          </Link>
        </div>
        <div className="block">
          <div className="overlay"></div>
          <p className="titleHP">Enter Social Network</p>
        </div>
        <div className="block">
          <Link to="/FCManualLook">
            <div className="overlay"></div>
            <p className="titleHP">Create New Look</p>
          </Link>
        </div>
        <div className="LogoBlock">
        <img src="src/Images/kolav.png"/>
        </div>
      </div>
      <div className="bottom-div">
        <NaviBarFooter />
      </div>
    </div>
  );
}
