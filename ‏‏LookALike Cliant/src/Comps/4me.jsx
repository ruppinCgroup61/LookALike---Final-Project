import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

import "../src/CreateAd.css";
import NaviBarFooter from "./NaviBarFooter";

function CreateAd() {
  const [dataFromServer, setDataFromServer] = useState(null);
  let clothingAd = null;
  let userEmail = sessionStorage.getItem("email");

  useEffect(() => {
    fetch(`https://localhost:7215/api/Item`, {
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
        console.log(data); // ניתן לעדכן את ה-state או לעשות פעולות נדרשות עם הנתונים שהתקבלו
        setDataFromServer([...data]);
      })
      .catch((error) => {
        console.error("There was a problem with fetch operation:", error);
      });
  }, []);

  // if (!dataFromServer) {
  //   return <div>Loading...</div>;
  // }

  console.log("44");
  console.log(dataFromServer);
  console.log("44");

  const { item } = useParams();
  console.log(item);
  const searchParams = new URLSearchParams(window.location.search);
  const choosenItem = JSON.parse(
    decodeURIComponent(searchParams.get("choosenItem"))
  );

  console.log("1");
  console.log(choosenItem);
  console.log("1");

  let photo = choosenItem.image;
  let color = "red";
  let name = choosenItem.name;
  let phone = "0527827133";

  const [ad, setAd] = useState({
    price: "",
    address: "",
    condition: "New",
  });

  const [showModal, setShowModal] = useState(false);
  const [isAddressOk, setIsAddressOk] = useState(true);
  const navigateTo = useNavigate();

  function handleSubmit() {
    if (!ad.price || !ad.address || !ad.condition) {
      setShowModal(true);
      return;
    } else {
      // Validate address format
      const addressPattern = /^[a-zA-Z0-9\s]+,[\s]+[a-zA-Z\s]+$/; // English address, comma, space, English address
      if (!addressPattern.test(ad.address)) {
        setIsAddressOk(false);
        return;
      }
      clothingAd = {
        user_Email: userEmail,
        item_ID: choosenItem.item_ID,
        price: choosenItem.price,
        address: choosenItem.address,
        Ad_Status: "Live",
        Condition: choosenItem.Condition,
      };
      console.log("55");
      console.log(clothingAd);
      console.log("55");

      navigateTo("/ad", {
        state: { ...ad, photo, color, name, phone },
      });

      

      // fetch("https://localhost:7215/api/ClothingAd", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(clothingAd),
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("Catch Error");
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {
      //     console.log(data);
      //     if (data === -1) {
      //       console.log("create ad failed");
      //     }
      //     if (data === 1) {
      //       console.log("create ad successfull");
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error during create ad:", error);
      //   });
    }
  }

  return (
    <>
      <div className="ad-form">
        <h1>Post Details</h1>
        <div className="ad-content">
          <div className="image-container">
            <img src={choosenItem.image} alt={choosenItem.name} />
          </div>
          <h2>
            {choosenItem.color} {choosenItem.name.toUpperCase()}
          </h2>
          <div className="input-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={ad.price}
              onChange={(e) => setAd({ ...ad, price: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={ad.address}
              placeholder="Street, city"
              onChange={(e) => setAd({ ...ad, address: e.target.value })}
            />
          </div>
          {isAddressOk === false && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert className="address_alert" severity="error">
                <AlertTitle>Error</AlertTitle>
                You must fill in the address exactly according to the following
                format: Street, city
              </Alert>
            </Stack>
          )}
          <div className="input-group">
            <label htmlFor="condition">Condition:</label>
            <select
              id="condition"
              name="condition"
              value={ad.condition}
              onChange={(e) => setAd({ ...ad, condition: e.target.value })}
            >
              <option value="new">New</option>
              <option value="like new">Like New</option>
              <option value="used">Used</option>
            </select>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <NaviBarFooter />

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Validation Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please fill in all fields.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateAd;