import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { IoArrowBack } from 'react-icons/io5';
import '../CSS/FollowerCloset.css'; // Import the new CSS file
import NaviBarFooter from '../Comps/NaviBarFooter';

function FollowerCloset() {
    const { email } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://localhost:7215/api/Item/GetAllItemsByUser${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setItems(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching items:', error);
            setLoading(false);
        });
    }, [email]);

    if (loading) {
        return (
            <div className="loading-container">
                <CircularProgress color="inherit" />
            </div>
        );
    }

    return (
        <div className="containerW">
            <div className="header_FC">
                <IoArrowBack className="back-icon" onClick={() => navigate('/SocialNetwork')} />
                <h2>{email} Wardrobe</h2>
            </div>
            <div className="clothing-list-Follower">
                {items.map((item, index) => (
                    <div key={index} className="clothing-item-Follower">
                        <div className="clothing-image-Follower">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="clothing-details-Follower">
                            <p><strong>Type:</strong> {item.clothing_Type}</p>
                            <p><strong>Brand:</strong> {item.brand}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='FooterFC'>
                <NaviBarFooter />
            </div>
        </div>
    );
}

export default FollowerCloset;