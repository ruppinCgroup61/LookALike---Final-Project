import React from 'react';
import { Link } from 'react-router-dom';

export default function FirstPage() {
    
  return (
    <div>
        <img style={{width: 80}} src="./Images/kolav.png" alt="lookalike" />
        <img style={{width: 300, marginBottom:50}} src="./Images/lookalike.png" alt="lookalike" />
        <Link to="/login">
            <button style={{backgroundColor: '#EEEEEE', width: 200, color: 'black', margin: 10, fontFamily: '"Urbanist", sans-serif'}}>Log in</button>
        </Link>
        <Link to="/register">
            <button style={{backgroundColor: 'black', width: 200, color: 'white', fontFamily: '"Urbanist", sans-serif'}}>Sign up</button>
        </Link>
    </div>
  );
}