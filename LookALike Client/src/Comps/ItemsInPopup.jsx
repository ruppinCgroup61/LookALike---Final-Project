import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ItemsInPopup() {
  const storedEmail = sessionStorage.getItem("email");
  const storedID = sessionStorage.getItem("PopupID");
  const [dataFromServer, setDataFromServer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://localhost:7215/api/PopUpDetails/GetAllPopUpItems/${storedEmail}/${storedID}`,
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
        console.log(data);
        setDataFromServer(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (!dataFromServer || dataFromServer.length === 0) {
    return (
      <>
        <div className="header">
          <button
            onClick={() => {
              navigate("/BusinessHomePage");
            }}
            className="PUup-button"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h2 id="PUh2header">{sessionStorage.getItem("PopupName")}</h2>
        </div>
        <div>No items found.</div>
      </>
    );
  }

  return (
    <>
      <div className="containerW">
        <div className="header">
          <button
            onClick={() => {
              navigate("/BusinessHomePage");
            }}
            className="IPUup-button"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h2 id="PUh2header">{sessionStorage.getItem("PopupName")}</h2>
        </div>
        <div className="PUclothing-list">
          {dataFromServer.map((item, index) => (
            <div key={index} className="clothing-item">
              <div className="clothing-image">
                <img src={item.itemImage} alt={item.itemName} />
                <p id="psize">{item.itemSize}</p>
              </div>
              <div className="clothing-details" id="PUclothing-details">
                <p>{item.itemName.toUpperCase()}</p>
                <p>{item.price}$</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
