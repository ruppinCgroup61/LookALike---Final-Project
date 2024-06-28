import React, { useState } from 'react';

import '../src/SignUp.css'

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Phone:', phone);
    console.log('Birthdate:', birthdate);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Image:', image);
    // You can add your sign-up logic here
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Sign Up</h1>
      </div>
      <input
        className="input"
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        className="input"
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="input"
        type="date"
        placeholder="Birthdate"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="input"
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button className="button" onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;