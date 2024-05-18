import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../src/LogIn.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useNavigate } from 'react-router-dom';



const LogIn = () => {
  const [Email, setUsername]                            = useState('');
  const [Password, setPassword]                         = useState('');
  const [showAlert, setAlert]                           = useState(false);
  const [emailError, setEmailError]                     = useState('');
  const [passwordError, setPasswordError]               = useState('');
  const navigateTo                                      = useNavigate();
  const [openSnackbar, setOpenSnackbar]                 = useState(false);
  const [snackbarMessage, setSnackbarMessage]           = useState('');
  const [openDialog, setOpenDialog]                     = useState(false);
  const [ForgotPasswordEmail,setForgotPasswordEmail]    = useState('');
  const [retrievedPassword, setRetrievedPassword]       = useState('');


  const handleLogIn = () => {
    const userData = {
      dateOfBirth                                       : '2024-05-04T16:32:31.976Z',
      email                                             : Email,
      firstName                                         : "Null",
      image                                             : "null",
      lastName                                          : "Null",
      password                                          : Password,
      PhoneNumber                                       : '0501231234',
    };

    //logIn api
    fetch('https://localhost:7215/api/User/login', {
      method                                            : 'PUT',
      headers: {
        'Content-Type'                                  : 'application/json'
      },
      body                                              : JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error('Login request failed');
      }
      return response.json();
    })
    .then(data => {
      console.log('Login successful:', data);
        sessionStorage.setItem('email', userData.email);
        setSnackbarMessage(`Welcome ${Email}`);
        setOpenSnackbar(true);
        setTimeout(() => {
        setOpenSnackbar(false);
        navigateTo("/HomePage");
        }, 2000);
    })
    .catch(error => {
      console.error('Error during login:', error);
      setAlert(true); // Show the alert if login returns -1
    });
  };

  const isEmailValid = () => {
    // Regular expression for email validation
    const emailRegex                                    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(Email);
  };

  const isPasswordValid = () => {
    // Regular expression for password validation
    const passwordRegex                                 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    return passwordRegex.test(Password);
  };

  const isEmailForPasswordIsValid=()=>{
    const emailRegex                                    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(ForgotPasswordEmail);
  }

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
    if (!isEmailValid()) {
      setEmailError('Email should be in the right format');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!isPasswordValid()) {
      setPasswordError('The password must contain an uppercase letter, a lowercase letter, a number and a special character');
    } else {
      setPasswordError('');
    }
  };

  const isFormValid = () => {
    // Check if all validations pass
    if (isEmailValid() && isPasswordValid()) {
      handleLogIn(); // Call handleRegister directly on form submission
    }
    else{

    }
  };

  const handleForgotPassword = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setForgotPasswordEmail(''); // Clear the input value
    setRetrievedPassword(''); // Clear the password value
  };

  const handleGetPassword = () => {
    // Fetch password
    console.log(JSON.stringify(ForgotPasswordEmail));
    fetch('https://localhost:7215/api/User/ForgotPassword', {
      method                                            : 'POST',
      headers: {
        'Content-Type'                                  : 'application/json'
      },
      body                                              : JSON.stringify(ForgotPasswordEmail) // Pass an object with the email property
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network Error');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.password);
      if (data.password === 'Not found') {
        console.log('NOOOO');
        setRetrievedPassword('Your Password was not found'); // Clear the password if not found
      } else {
        console.log('YESSSS');
        setRetrievedPassword('Your Password is:'+data.password); // Clear the password if not found
      }
    })
    .catch(error => {
      console.log(error);
      console.error('Error during Api:', error);
    });
  };


  return (
    <div className                                      = "container">
      <div className                                    = "tit">
        <button onClick                                 = {() => navigateTo("/FirstPage")} className="back-button2">
          <FontAwesomeIcon icon                         = {faArrowLeft} />
        </button>
        <h2 className                                   = "title">SIGN IN</h2>
      </div>
      <div className                                    = 'CenterDiv'>
        <label className                                = 'Label'>Email Address</label>
        <input
          className                                     = "input"
          type                                          = "text"
          placeholder                                   = "Email Address"
          value                                         = {Email}
          onChange                                      = {handleEmailChange}
        />
        {emailError && <p style                         = {{ color: 'red' }}>{emailError}</p>}
        <label className                                = 'Label'>Password</label>
        <div className                                  = "password-input-wrapper">
          <input
            className                                   = "input"
            type                                        = {"password"}
            placeholder                                 = "Password"
            value                                       = {Password}
            onChange                                    = {handlePasswordChange}
          />
        </div>
        {passwordError && <p style                      = {{ color: 'red' }}>{passwordError}</p>}
        <div className                                  = "tit1">
          <button className                             = "button" onClick={isFormValid} disabled={!isEmailValid() || !isPasswordValid()}>
          SIGN IN
          </button>
          <button className                             = "forgotPasswordButton" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </div>
      </div>
      <Stack sx                                         = {{ width: '100%' }} spacing={2}>
        {showAlert && ( // Conditionally render the alert based on showAlert state
          <Alert severity                               = "error" onClose={() => setAlert(false)}>
            <AlertTitle>Login failed</AlertTitle>
            Wrong Email or Password!
          </Alert>
        )}
      </Stack>
              <Snackbar
          anchorOrigin={{
            vertical                                    : 'top',
            horizontal                                  : 'center',
          }}
          open                                          = {openSnackbar}
          autoHideDuration                              = {2000}
          onClose                                       = {() => setOpenSnackbar(false)}
        >
        <SnackbarContent 
          sx={{
            backgroundColor                             : '#fff',
            boxShadow                                   : '0 3px 5px rgba(0, 0, 0, 0.2)',
            borderRadius                                : '4px',
            border                                      : '1px solid #d2d2d2',
            textAlign                                   : 'center',
            fontFamily                                  : 'Urbanist, sans-serif',
            fontSize                                    : '20px',
            color                                       : '#333',
            fontWeight                                  : 'bold',
            padding                                     : '10px 20px',
          }}
          message                                       = {snackbarMessage}
        />
      </Snackbar>
       {/* Forgot Password Dialog */}
       <Dialog open                                     = {openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Forgot Password?</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin                                      = "dense"
            label                                       = "Email Address"
            type                                        = "text"
            fullWidth
            value                                       = {ForgotPasswordEmail}
            onChange                                    = {(e) => setForgotPasswordEmail(e.target.value)} // Update this line
          />
           <p className                                 = 'PasswordToPresent'>{retrievedPassword}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick                               = {handleCloseDialog}>Close</Button>
          <Button onClick                               = {handleGetPassword} disabled={!isEmailForPasswordIsValid()} >Get Password</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogIn;
