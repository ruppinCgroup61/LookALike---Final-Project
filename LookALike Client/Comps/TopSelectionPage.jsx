import React from 'react';
import { Link } from 'react-router-dom';

const TopSelectionPage = ({ setSelectedTop }) => {
  const tops = [
    { id: 1, name: 'Top 1', image: '../Images/04805428802-e1.jpg' },
    { id: 2, name: 'Top 2', image: '../Images/06224495251-e1.jpg' },
    // Add more items as needed
  ];

  return (
    <div>
      <h2>Select a Top</h2>
      <div className="items-list">
        {tops.map(top => (
          <div key={top.id} className="item">
            <Link to="/FCManualLook" onClick={() => setSelectedTop(top)}>
              <img className="item-image" src={top.image} alt={top.name} />
              <p>{top.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSelectionPage;
