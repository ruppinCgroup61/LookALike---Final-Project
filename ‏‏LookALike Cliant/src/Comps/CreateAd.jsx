import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import "../CSS/CreateAd.css";
import NaviBarFooter from "./NaviBarFooter";
import { Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, TextField } from '@mui/material';
import { FaWhatsapp, FaTimes } from "react-icons/fa";

function CreateAd() {
  const navigateTo = useNavigate();
  const [ad, setAd] = useState({
    price: "",
    address: "",
    condition: "New",
  });
  const [showModal, setShowModal] = useState(false);
  const [isAddressOk, setIsAddressOk] = useState(true);
  let clothingAd = null;
  let userEmail = sessionStorage.getItem("email");
  const { item } = useParams(); //item_ID
  const [open, setOpen] = React.useState(false);

  console.log(item); //item_ID

  const searchParams = new URLSearchParams(window.location.search);
  const choosenItem = JSON.parse(
    decodeURIComponent(searchParams.get("choosenItem"))
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  console.log("1");
  console.log(choosenItem);
  console.log("1");

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
        ad_ID: 0,
        user_Email: userEmail,
        item_ID: parseFloat(choosenItem.item_ID),
        price: parseFloat(ad.price),
        address: ad.address,
        ad_Status1: "Live",
        condition1: ad.condition,
        item_Image: "string",
        phone_Number: "string",
        itemName: "string",
        clothingType_Name: "string",
      };
      console.log("55");
      console.log(clothingAd);
      console.log("55");

      fetch("https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/ClothingAd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clothingAd),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Catch Error");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data === -1) {
            console.log("create ad failed");
            setSnackbarMessage(`Item already in Market-Place!`);
            setOpenSnackbar(true);
            setTimeout(() => {
              setOpenSnackbar(false);
              navigateTo("/MyWardrobe");
            }, 2000);
          }
          if (data === 1) {
            console.log("create ad successfull");
            navigateTo(`/Ad/${item}`);
          }
        })
        .catch((error) => {
          console.error("Error during create ad:", error);
        });
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (value) => {
    setAd({ ...ad, condition: value });
    handleClose();
  };

  const closeAd = () => {
    navigateTo("/MyWardrobe");
  };

  return (
    <>
      <div className="ad-form">
        <h1>Post Details</h1>
        <div className="ad-content">
          <div className="image-container">
            <img src={choosenItem.image} alt={choosenItem.name} />
          </div>
          <h2>{choosenItem.name.toUpperCase()}</h2>
          <div className="ad-input-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={ad.price}
              onChange={(e) => setAd({ ...ad, price: e.target.value })}
            />
          </div>
          <div className="ad-input-group">
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
          <div className="ad-input-group">
            <label htmlFor="condition">Condition:</label>
            <TextField
              id="condition"
              name="condition"
              value={ad.condition}
              onClick={handleClickOpen}
              variant="outlined"
              readOnly
              className="condition-input"
            />

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Select Condition</DialogTitle>
              <DialogContent>
                <List>
                  <ListItem className="ad_cond" onClick={() => handleSelect("new")}>
                    <ListItemText primary="New" />
                  </ListItem>
                  <ListItem className="ad_cond" onClick={() => handleSelect("like new")}>
                    <ListItemText primary="Like New" />
                  </ListItem>
                  <ListItem className="ad_cond" onClick={() => handleSelect("used")}>
                    <ListItemText primary="Used" />
                  </ListItem>
                </List>
              </DialogContent>
              <DialogActions>
                <Button id='ad_btn_dialog' onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
        >
          <SnackbarContent
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
              border: "1px solid #d2d2d2",
              textAlign: "center",
              fontFamily: "Urbanist, sans-serif",
              fontSize: "20px",
              color: "#333",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            message={snackbarMessage}
          />
        </Snackbar>
      </div>
      {/* Close button */}
      <div className="CloseAd" style={{ position: "absolute", top: "10px", right: "35px", cursor: "pointer" }}>
        <FaTimes onClick={closeAd} size={24} />
      </div>
      <NaviBarFooter />

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Title id="ad_modal_title">Validation Error</Modal.Title>
        <Modal.Body className="ad_modal_er">Please fill in all fields.</Modal.Body>
        <Modal.Footer>
          <Button id="ad_modal_btn" variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateAd;
