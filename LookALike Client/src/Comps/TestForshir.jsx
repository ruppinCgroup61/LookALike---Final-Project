//test 19.06

import React, { useState } from 'react';
import '../CSS/Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const Register = () => {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    email: '',
    firstName: '',
    image: '',
    lastName: '',
    password: '',
    PhoneNumber: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [firstNameForPopup, setFirstNameForPopup] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [imageAdded, setImageAdded] = useState(false);
  const [activeError, setActiveError] = useState(null);
  const [EmailAlreadyExsist, setEmailAlreadyExsistAlert] = useState(false);
  const api = location.hostname === "localhost" || location.hostname === "127.0.0.1" ?
  `https://localhost:7215/api/Users` :
  `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/User`;
  const navigateTo = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error message when user starts typing
    setActiveError(null);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFileName(file.name);
      setImageAdded(true);
    }
  };

  const handleInputBlur = (name) => {
    let errorType = null;
    if (name === 'password' && !isPasswordValid()) {
      errorType = 'password';
    }
    if (name === 'email' && !isEmailValid()) {
      errorType = 'email';
    }
    if ((name === 'firstName' || name === 'lastName') && !isNameValid(formData[name])) {
      errorType = name;
    }
    if (name === 'PhoneNumber' && !isPhoneNumberValid(formData[name])) {
      errorType = 'PhoneNumber';
    }
    setActiveError(errorType);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const userData = { ...formData };
    console.log(userData);
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Catch Error');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      if(data === -1) {
        console.log('Registration failed');
        setEmailAlreadyExsistAlert(true);
      }
      if(data === 1) {
        console.log('Registration successfull');
        setFirstNameForPopup(data.firstName);
        setRegistrationSuccess(true);
        navigateTo("/logIn");
      }
    })
    .catch(error => {
      console.error('Error during registration:', error);
    });
  };

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  const isPasswordValid = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(formData.password);
  };

  const isNameValid = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
  };

  const isPhoneNumberValid = (phoneNumber) => {
    const phoneRegex = /^(050|052|058|055|051)\d{7}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.PhoneNumber.trim() !== '' &&
      formData.dateOfBirth.trim() !== '' &&
      isEmailValid() &&
      isPasswordValid() &&
      isNameValid(formData.firstName) &&
      isNameValid(formData.lastName) &&
      isPhoneNumberValid(formData.PhoneNumber)
    );
  };

  return (
    <div>
      {/* Header Div */}
      <div className="header_reg">
        <button onClick={() => navigateTo("/")} className="back-button_Register">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2 className="Hadder_register">SIGN UP</h2>
      </div>

      {/* Center Div */}
      <div className="form-container">
        {registrationSuccess && (
          <div className="popup">
            <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
            <p>Welcome Abord {firstNameForPopup}!</p>
          </div>
        )}
        <form onSubmit={handleRegister} className="CenterDiv">
          {/* Input fields */}
          <div className="InputBlock">
            <label>First Name: *</label>
            <input
              required
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={() => handleInputBlur('firstName')} 
            />
            {activeError === 'firstName' && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Please enter a valid first name.
              </Alert>
            )}
          </div>
          <div className="InputGap"></div>
          <div className="InputBlock">
            <label>Last Name: *</label>
            <input
              required
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={() => handleInputBlur('lastName')} 
            />
            {activeError === 'lastName' && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Please enter a valid last name.
              </Alert>
            )}
          </div>
          <div className="InputGap"></div>
          <div className="InputBlock">
            <label>Email: *</label>
            <input
              required
              type="email"
              name="email"
              placeholder="example@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleInputBlur('email')} 
            />
            {activeError === 'email' && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Please enter a valid email address.
              </Alert>
            )}
          </div>
          <div className="InputGap"></div>
          <div className="InputBlock">
            <label>Phone Number: *</label>
            <input
              required
              type="tel"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
              onBlur={() => handleInputBlur('PhoneNumber')} 
            />
            {activeError === 'PhoneNumber' && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Please enter a valid phone number.
              </Alert>
            )}
          </div>
          <div className="InputGap"></div>
          <div className="InputBlock">
            <label>Date of Birth: *</label>
            <input
              required
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              max="2011-01-01"
            />
          </div>
          <div className="InputGap"></div>
          <div className="InputBlock">
            <label>Password: *</label>
            <div className="password-input-container">
              <input
                required
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleInputBlur('password')} 
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                className="password-visibility-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
            {activeError === 'password' && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Password must be at least 8 characters long, with one uppercase letter, one number, and one special character.
              </Alert>
            )}
          </div>
          <div className="InputGap"></div>
          <div className="InputBlock file-input-container">
            <label>Profile Image:</label>
            <div className="custom-file-input">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="image-upload"
                className="file-input"
              />
              <label htmlFor="image-upload" className="file-label">
                {imageAdded ? selectedFileName : <FontAwesomeIcon icon={faPlus} />}
              </label>
            </div>
            {imagePreviewUrl && (
              <div className="image-preview-container">
                <img src={imagePreviewUrl} alt="Profile Preview" className="image-preview" />
              </div>
            )}
          </div>
          {EmailAlreadyExsist && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">User with the same email address already exists!</Alert>
            </Stack>
          )}
          {/* Register Button */}
          <div className="register-button-container">
            <button type="submit" disabled={!isFormValid()}>REGISTER</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
