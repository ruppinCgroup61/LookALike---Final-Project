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
  const [wrongPasswordAlert, setWrongPasswordAlert] = useState(false);
  const [wrongEmailAlert, setWrongEmailAlert] = useState(false);
  const [wrongNameAlert, setWrongNameAlert] = useState(false);
  const [wrongPhoneNumberAlert, setWrongPhoneNumberAlert] = useState(false);
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
    setWrongPasswordAlert(false);
    setWrongEmailAlert(false);
    setWrongNameAlert(false);
    setWrongPhoneNumberAlert(false);
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
    // Show error message when input field loses focus and is empty or when password is invalid
    if ((name === 'password' && !isPasswordValid())) {
      setWrongPasswordAlert(true);
    }
    if (name === 'email' && !isEmailValid()) {
      setWrongEmailAlert(true);
    }
    if ((name === 'firstName' || name === 'lastName') && !isNameValid(formData[name])) {
      setWrongNameAlert(true);
    }
    if (name === 'PhoneNumber' && !isPhoneNumberValid(formData[name])) {
      setWrongPhoneNumberAlert(true);
    }
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
    .then(data   => {
      console.log(data);
      if(data===-1)
        {
          console.log('Registration failed');
          setEmailAlreadyExsistAlert(true);

        }
      if(data ===1)
        {
          console.log('Registration successfull');
          setFirstNameForPopup(data.firstName);
          setRegistrationSuccess(true);
          navigateTo("/logIn")
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
        <form onSubmit={handleRegister} className='CenterDiv'>
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
            {wrongNameAlert && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Please enter a valid first name.
              </Alert>
            )}
          </div>
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
            {wrongNameAlert && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Please enter a valid last name.
              </Alert>
            )}
          </div>
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
            {wrongEmailAlert && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Please enter a valid email address.
              </Alert>
            )}
          </div>
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
            {wrongPhoneNumberAlert && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Please enter a valid phone number.
              </Alert>
            )}
          </div>
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
                onClick={togglePasswordVisibility}
                className="password-toggle-icon"
              />
            </div>
            {wrongPasswordAlert && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Password must contain a capital letter, a lowercase letter, a number, and a special character.
              </Alert>
            )}
          </div>
          <div className="InputBlock">
            <label>Photo: *</label>
            <div className="file-input-container">
              <input
                required
                type="file"
                name="image"
                id="file-input"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <label htmlFor="file-input" className="custom-file-input">
                <FontAwesomeIcon icon={faPlus} className="file-icon" />
                {imageAdded ? "Image added successfully" : "Add Image"}
              </label>
            </div>
          </div>
          <button type="submit" className="submit-button" onClick={isFormValid} disabled={!isFormValid()}>
            CREATE ACCOUNT
          </button>
        </form>
      </div>

      {/* Bottom Div */}
      <div className="BottomDiv"> 
      <Stack sx={{ width: '100%' }} spacing={2}>
      {EmailAlreadyExsist && (
              <Alert severity="error" onClose={() => {setEmailAlreadyExsistAlert(false);}}>
                <AlertTitle>Registration failed</AlertTitle>
                Email already exists!
                </Alert>
       )}
      </Stack>
        <h2>LookALike</h2>
      </div>
    </div>
  );
};

export default Register;
