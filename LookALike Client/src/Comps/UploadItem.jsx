import React, { useState, useEffect, useRef } from "react";
import "../CSS/UploadItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NaviBarFooter from "./NaviBarFooter";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

function UploadItem() {
  const [formDataUpload, setFormData] = useState({
    item_ID: 0,
    item_Code: 0,
    name: "",
    image: "null",
    color_Code: "",
    season: "",
    size: "",
    brand_ID: 0,
    price: 0,
    is_Favorite: false,
    status: "live",
    user_Email: "",
    clothingType_ID: 0,
  });

  const [brands, setBrands] = useState([]);
  const [clothingTypes, setClothingTypes] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const imageCaptureInput = useRef(null);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const navigateTo = useNavigate();
  const userEmail = sessionStorage.getItem("email"); // Retrieve email from session storage
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // Fetch all brands and clothing types when the component mounts
    GetAllBrands();
    GetAllClothingTypes();
    GetAllColors();
  }, []);

  const Change = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      user_Email: userEmail,
    }));
  };

  const GetAllColors = () => {
    fetch("https://localhost:7215/api/Colors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Catch Error");
        }
        return response.json();
      })
      .then((data) => {
        setColors(data);
      })
      .catch((error) => {
        console.error("Error during fetching colors:", error);
      });
  };

  // Function to handle size selection
  const handleSizeSelection = (size) => {
    setFormData((prevState) => ({
      ...prevState,
      size: size, // update the size in the form data
    }));
    event.preventDefault();
  };

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreviewUrl(base64String);
        setFormData((prevState) => ({
          ...prevState,
          image: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const openCamera = () => {
    imageCaptureInput.current.click();
  };
  let isBusi = sessionStorage.getItem("isBusiness");
  let pID = sessionStorage.getItem("PopupID");
  let UserEmail = sessionStorage.getItem("email");

  const SubmitUpload = (event) => {
    event.preventDefault();
    console.log(formDataUpload);

    if (isBusi == "false") {
      fetch("https://localhost:7215/api/Item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataUpload),
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
            console.log("item exists");
          }
          if (data === 1) {
            console.log("item added successfully");
            setSnackbarMessage(`item added successfully`);
            setOpenSnackbar(true);
            setTimeout(() => {
              setOpenSnackbar(false);
              if (sessionStorage.getItem("isBusiness") == "false")
                navigateTo("/MyWardrobe");
              else navigateTo("/BusinessHomePage");
            }, 2000);
          }
        })
        .catch((error) => {
          console.error("Error during registration:", error);
        });
    } else {
      const url = `https://localhost:7215/api/PopupDetails/InsertItemToPopUp?popUpId=${pID}&userMail=${encodeURIComponent(
        UserEmail
      )}`;
      console.log("Sending request to:", url);

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataUpload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Catch Error");
          }
          return response.text();
        })
        .then((data) => {
          console.log(data);
          if (data === "Item successfully inserted into the popup.") {
            console.log("item added successfully");
            setSnackbarMessage(`item added successfully`);
            setOpenSnackbar(true);
            setTimeout(() => {
              setOpenSnackbar(false);
              navigateTo("/BusinessHomePage");
            }, 2000);
          } else {
            console.log("Failed to add item:", data);
          }
        })
        .catch((error) => {
          console.error("Error during registration:", error);
        });
    }
  };

  const GetAllBrands = () => {
    fetch("https://localhost:7215/api/Brand", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Catch Error");
        }
        return response.json();
      })
      .then((data) => {
        setBrands(data);
      })
      .catch((error) => {
        console.error("Error during fetching brands:", error);
      });
  };

  const GetAllClothingTypes = () => {
    fetch("https://localhost:7215/api/ClothingType", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Catch Error");
        }
        return response.json();
      })
      .then((data) => {
        setClothingTypes(data);
      })
      .catch((error) => {
        console.error("Error during fetching clothing types:", error);
      });
  };

  const [data, setData] = useState("Not Found"); // מצב התחלתי של טקסט התוצאה
  const [isActive, setIsActive] = useState(false); // כדי לשלוט על הפעלת הסריקה
  const handleUpdate = (err, result) => {
    if (result) {
      setData(result.text);
      setIsActive(false); // עצור את הסריקה לאחר קריאת תוצאה
      console.log(result);
      // setFormData(prevState => ({
      //     ...prevState,
      //     item_Code: result.text // update the barcode in the form data
      // }));
    } else {
      setData("Scanning..."); // עדכון הטקסט בזמן סריקה
    }
    //console.log("1")
  };
  const [imageUrl, setImageUrl] = useState("");

  // useEffect(() => {
  //     const fetchImage = async () => {
  //         try {

  //           // החליפי את ה-URL עם הכתובת של האתר שממנו את רוצה לשלוף את התמונה
  //           const result = await axios.get('http://www.zara.com/qr/0622449525105');
  //           const parser = new DOMParser();
  //           const htmlDocument = parser.parseFromString(result.data, "text/html");
  //           const imgElement = htmlDocument.querySelector("img"); // הוסיפי מזהה ספציפי אם יש צורך
  //           setImageUrl(imgElement.src);
  //         }
  //         catch (error) {
  //           console.error('Error fetching image:', error);
  //         }
  //       };

  //     fetchImage();
  // }, []);

  return (
    <div className="Upload_Container">
      <div className="Upload_Header">
        <button
          onClick={() => {
            if (sessionStorage.getItem("isBusiness") == "false")
              navigateTo("/HomePage");
            else navigateTo("/BusinessHomePage");
          }}
          className="up-button"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="LogoFont">LookALike</h1>
      </div>
      <div className="Upload_Header2">
        <h2>ADD NEW CLOTHING</h2>
        <hr className="Header_Separator" />
      </div>
      <div className="form-centerDiv">
        <form onSubmit={SubmitUpload}>
          <div className="button-group">
            <button onClick={openCamera} type="button" className="takephoto">
              Take Photo
            </button>
            <button
              type="button"
              className="takephoto"
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? "Stop Scanning" : "Start Scanning"}
            </button>
          </div>
          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="Preview"
              className="image-preview"
            />
          )}
          {isActive && (
            <div>
              <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={handleUpdate}
              />

              <div>
                <h1>Fetched Image</h1>

                {imageUrl && <img src={imageUrl} alt="Fetched" />}
              </div>
            </div>
          )}
          <input
            ref={imageCaptureInput}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleCapture}
            style={{ display: "none" }}
          />
          <div className="form-group">
            <label>
              CLOTHING TYPE:
              <select
                name="clothingType_ID"
                value={formDataUpload.clothingType_ID}
                onChange={Change}
              >
                <option value="0">Select Clothing Type</option>
                {clothingTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.clothing_Type}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              SEASON:
              <select
                name="season"
                value={formDataUpload.season}
                onChange={Change}
              >
                <option value="">Select a season</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="Other">Transition</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              BRAND:
              <select
                name="brand_ID"
                value={formDataUpload.brand_ID}
                onChange={Change}
              >
                <option value="0">Select a brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.brandName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Color:
              <select
                name="color_Code"
                value={formDataUpload.color_Code}
                onChange={Change}
              >
                <option value="">Select a color</option>
                {colors.map((color) => (
                  <option key={color.color_name} value={color.color_name}>
                    {color.color_name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>size:</label>
            <div className="size-buttons">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  className={
                    formDataUpload.size === size
                      ? "size-button active"
                      : "size-button"
                  }
                  onClick={() => handleSizeSelection(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formDataUpload.name}
              onChange={Change}
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formDataUpload.price}
              onChange={Change}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit_item">
              Add Item
            </button>
          </div>
        </form>
        {sessionStorage.getItem("isBusiness") == "false" ? (
          <div className="Navbar Footer">
            <NaviBarFooter />
          </div>
        ) : null}
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
  );
}

export default UploadItem;
