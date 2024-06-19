import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BottomSelectionPage = ({ setSelectedBottom }) => {
  const [bottoms, setBottoms] = useState([]);
  const userEmail = sessionStorage.getItem("email"); // Retrieve email from session storage

  useEffect(() => {
    fetch(`https://localhost:7215/api/Item/GetAllBottom${userEmail}`, { // Correct path according to your API
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          console.log("Error fetching bottoms");
          throw new Error('Error fetching bottoms');
        }
        return response.json();
      })
      .then(data => {
        setBottoms(data);
        console.log("Data fetched successfully:", data);
      })
      .catch(error => {
        console.error('Error during fetching bottoms:', error);
      });
  }, [userEmail]); // Ensure the fetch happens only once when userEmail changes

  return (
    <div>
      <h2>Select a Bottom</h2>
      <div className="items-list">
        {bottoms.map(bottom => (
          <div key={bottom.item_ID} className="item">
            <Link to="/FCManualLook" onClick={() => setSelectedBottom(bottom)}>
              <img src={bottom.image} alt={bottom.name} />
              <p>{bottom.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomSelectionPage;
