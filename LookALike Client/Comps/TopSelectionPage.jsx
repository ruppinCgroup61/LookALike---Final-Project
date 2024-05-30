import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TopSelectionPage = ({ setSelectedTop }) => {
  //console.log("sss")
  const [tops, setTops] = useState([]);
  const userEmail = sessionStorage.getItem("email"); // Retrieve email from session storage

  useEffect(() => {
    fetch(`https://localhost:7215/api/Item/GetAllTop${userEmail}`, { // Correct path according to your API
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          console.log("Error fetching tops");
          throw new Error('Error fetching tops');
        }
        return response.json();
      })
      .then(data => {
        setTops(data);
        console.log("Data fetched successfully:", data);
      })
      .catch(error => {
        console.error('Error during fetching tops:', error);
      });
    }, []);

 
      // console.log(data);

  return (
    <div>
      <h2>Select a Top</h2>
      <div className="items-list">
        {tops.map(top => (
          <div key={top.item_ID} className="item">
            <Link to="/FCManualLook" onClick={() => setSelectedTop(top)}>
              <img src={top.image} alt={top.name} />
              <p>{top.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSelectionPage;
