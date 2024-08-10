import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../CSS/LogIn.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigateTo = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [ForgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [dialogState, setDialogState] = useState("requestCode"); // State to track dialog flow
  const [retrievedPassword, setRetrievedPassword] = useState("");

  const handleLogIn = () => {
    const userData = {
      email: Email,
      password: Password,
    };

    fetch("https://proj.ruppin.ac.il/cgroup61/api/User/login", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login request failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful:", data);

        const { email, isBusiness, firstName, lastName } = data;
        const fullName = `${firstName} ${lastName}`.trim();

        sessionStorage.setItem("email", email);
        sessionStorage.setItem("isBusiness", isBusiness);
        sessionStorage.setItem("fullName", fullName);

        setSnackbarMessage(`Welcome ${email}`);
        setOpenSnackbar(true);

        setTimeout(() => {
          setOpenSnackbar(false);

          // Redirect based on account type
          if (isBusiness) {
            navigateTo("/BusinessHomePage");
          } else {
            navigateTo("/HomePage");
          }
        }, 2000);
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setShowAlert(true);
      });
  };

  const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email);

  const isPasswordValid = () => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(Password);

  const isEmailForPasswordIsValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ForgotPasswordEmail);

  const isPhoneNumberValid = () => /^\d{9}$/.test(phoneNumber); // Only digits and exactly 9 digits

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleForgotPassword = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setForgotPasswordEmail("");
    setPhoneNumber("");
    setVerificationCode("");
    setNewPassword("");
    setRetrievedPassword("");
    setDialogState("requestCode"); // Reset to request code state
  };

  const handleRequestCode = () => {
    if (!isEmailForPasswordIsValid() || !isPhoneNumberValid()) {
      setRetrievedPassword("Please enter a valid email address and phone number.");
      return;
    }

    fetch("https://proj.ruppin.ac.il/cgroup61/api/ForgotPassword/sendVerificationCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: `+972${phoneNumber}` }), // Prepend +972 to phoneNumber
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setDialogState("verifyCode"); // Switch to code verification state
          setRetrievedPassword("A verification code has been sent to your phone.");
        } else {
          setRetrievedPassword("Your phone number was not found.");
        }
      })
      .catch((error) => console.error("Error during API call:", error));
  };

  const handleVerifyCode = () => {
    if (!verificationCode || !newPassword) {
      setRetrievedPassword("Please enter all required fields.");
      return;
    }

    fetch("https://proj.ruppin.ac.il/cgroup61/api/ForgotPassword/verifyCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber: `+972${phoneNumber}`, // Prepend +972 to phoneNumber
        code: verificationCode,
        email: ForgotPasswordEmail,
        newPassword: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRetrievedPassword("Your password has been successfully reset.");
          handleCloseDialog();
          setOpenSnackbar(true);
          setSnackbarMessage("Password has been successfully reset.");
        } else {
          setRetrievedPassword("Invalid verification code or phone number.");
        }
      })
      .catch((error) => console.error("Error during password reset:", error));
  };

  return (
    <div className="login_container">
      <div className="login_tit">
        <button onClick={() => navigateTo("/cgroup61/test2/tar3/")} className="back-button2">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2 className="login_title">SIGN IN</h2>
      </div>
      <div className="login_middle">
        <div className="CenterDiv">
          <label className="login_Label">Email Address :</label>
          <input
            className="login_input"
            type="text"
            placeholder="Email Address"
            value={Email}
            onChange={handleEmailChange}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          <label className="login_Label">Password :</label>
          <div className="password-input-wrapper">
            <input
              className="login_input"
              type="password"
              placeholder="Password"
              value={Password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        <div className="tit1">
          <button
            className="login_button"
            onClick={handleLogIn}
            disabled={!isEmailValid() || !isPasswordValid()}
          >
            SIGN IN
          </button>
          <button
            className="forgotPasswordButton"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </div>
      <Stack sx={{ width: "60%" }} spacing={2}>
        {showAlert && (
          <Alert severity="error" onClose={() => setShowAlert(false)}>
            <AlertTitle>Login failed</AlertTitle>
            Wrong Email or Password!
          </Alert>
        )}
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Forgot Password?</DialogTitle>
        <DialogContent>
          {dialogState === "requestCode" ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="text"
                fullWidth
                value={ForgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  margin="dense"
                  label="Prefix"
                  type="text"
                  value="+972"
                  InputProps={{
                    readOnly: true,
                  }}
                  style={{ maxWidth: "80px", marginRight: "8px" }} // Adjust the width and spacing as needed
                />
                <TextField
                  margin="dense"
                  label="Phone Number"
                  type="text"
                  fullWidth
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <p className="PasswordToPresent">{retrievedPassword}</p>
            </>
          ) : (
            <>
              <TextField
                margin="dense"
                label="Verification Code"
                type="text"
                fullWidth
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <TextField
                margin="dense"
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <p className="PasswordToPresent">{retrievedPassword}</p>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {dialogState === "requestCode" ? (
            <Button
              onClick={handleRequestCode}
              disabled={!isEmailForPasswordIsValid() || !isPhoneNumberValid()}
            >
              Get Verification Code
            </Button>
          ) : (
            <Button
              onClick={handleVerifyCode}
              disabled={!verificationCode || !newPassword}
            >
              Verify Code and Reset Password
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogIn;
