import React, { useState } from 'react';

import '../src/LogIn.css'

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = () => {
    // Implement your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // You can add your authentication logic here
  };

  return (
    <div className="container">
      <div className="tit">
        <h1 className="title">LOG IN</h1>
      </div>
      <input
        className="input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="tit1">
        <button className="button" onClick={handleLogIn}>
          GO
        </button>
        <button className="forgotPasswordButton">
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default LogIn;