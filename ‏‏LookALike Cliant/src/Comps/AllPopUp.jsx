import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/PopUp.css";
import NaviBarFooter from "./NaviBarFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AllPopUp = () => {
  const userEmail = sessionStorage.getItem("email");
  const [pops, setPop] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/PopUp/GetActivePopUps`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPop(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
        setLoading(false); // Also stop loading on error
      });
  }, []);

  const formatDate = (dateString) => {
    const datePart = dateString.split("T")[0];
    const [year, month, day] = datePart.split("-");
    return `${day}.${month}.${year}`;
  };

  const handlePopUpClick = (popUpId, userEmail, popupname) => {
    navigate(`/popup-details/${userEmail}/${popUpId}/${popupname}`);
  };

  return (
    <>
      <div className="app-container">
        <div className="Upload_Header3" id="headerP">
          <button onClick={() => navigate("/MainPopUpC")} className="popupback">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h4 className="cc" id="LogoFont3">
            All Pop-Ups
          </h4>
        </div>

        <div id="list-All-pop">
          {loading ? (
            // Display skeleton loader if loading
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="skeleton-popup skeleton" />
            ))
          ) : pops.length === 0 ? (
            <div id="no-popup-message">You don't have any pop up yet</div>
          ) : (
            pops.map((pop, index) => (
              <div
                key={index}
                id="userpopup"
                onClick={() =>
                  handlePopUpClick(pop.popUp_Id, pop.user_Email, pop.popUp_Name)
                }
              >
                <img src={pop.userImage} alt="PopUp" />
                <div>
                  <p>{pop.popUp_Name}</p>
                  <p>{pop.fullUserName}</p>
                  <p>
                    {formatDate(pop.startDate)} - {formatDate(pop.endDate)}
                  </p>
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
