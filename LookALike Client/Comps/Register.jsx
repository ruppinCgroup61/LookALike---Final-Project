import React, { useState } from 'react';
import '../src/Register.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dob: '', // Date of Birth
    password: '',
    email: '',
    photo: null
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // מצב לקידוד תצוגה מקדימה של התמונה

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result); // שמירת תמונת התצוגה במצב
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="form-container">
      <button onClick={() => window.history.back()} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h2>SIGN UP</h2>
      {imagePreviewUrl && <img src={imagePreviewUrl} alt="Uploaded Preview" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />}
      <form onSubmit={handleSubmit}>
        {/* שדות הטופס */}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Photo:</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className='submit'>CREATE ACCOUNT</button>
      </form>
      <footer className="footer">
        <img src="/Images/lookalike.png" alt="Logo" className="logo" />
      </footer>
    </div>
  );
}

export default Register;