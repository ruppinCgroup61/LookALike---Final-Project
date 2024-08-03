import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/HomeLook.css";
import "../CSS/PopUp.css";
import NaviBarFooter from "./NaviBarFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AllPopUp = () => {
  const userEmail = sessionStorage.getItem("email");
  const [pops, setPop] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://localhost:7215/api/PopUp/GetActivePopUps`, {
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
        setPop(data);
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    const datePart = dateString.split("T")[0];
    const [year, month, day] = datePart.split("-");
    return `${day}.${month}.${year}`;
  };

  const handlePopUpClick = (popUpId,userrmail) => {
    navigate(`/popup-details/${userrmail}/${popUpId}`);
  };

  return (
    <>
      <div className="app-container">
        <div className="Upload_Header3" id="headerP"> 
          <button onClick={() => navigate("/MainPopUpC")} className="popupback">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h4 className="cc" id="LogoFont3">All Pop-Up</h4>
        </div>

        <div id="list-All-pop">
          {pops.length === 0 ? (
            <div id="no-looks-message">You don't have any pop up yet</div>
          ) : (
            pops.map((pop, index) => (
              <div
                key={index}
                id="userpopup"
                onClick={() => handlePopUpClick(pop.popUp_Id,pop.user_Email)} // ניווט לעמוד פרטי הפופ-אפ
              >
                <img src={pop.userImage} alt="PopUp" />
                <div>
                  <p>{pop.fullUserName} </p>
                  <p>{formatDate(pop.startDate)} - {formatDate(pop.endDate)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bottom-div">
          <NaviBarFooter />
        </div>
      </div>
    </>
  );
};

export default AllPopUp;
