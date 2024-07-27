import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { IoArrowBack } from 'react-icons/io5';
import { IoIosHeartEmpty } from "react-icons/io";
import '../CSS/FollowerCloset.css'; // Import the new CSS file
import NaviBarFooter from '../Comps/NaviBarFooter';

function FollowerCloset() {
    const { email } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const likerEmail = sessionStorage.getItem("email");

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

    const handleLike = (itemId) => {
        console.log(itemId,likerEmail,email);
        fetch("https://localhost:7215/api/Algorithm/LikeItemFromFriendCloset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                adminUserMail: likerEmail,  // Assuming likerEmail is the admin user's email
                closetUserMail: email,      // Assuming email is the closet owner's email
                itemId: itemId,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok",response);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Optionally, update the state or UI to reflect the like action
        })
        .catch(error => {
            console.error('Error liking item:', error);
        });
    };

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
                <h3>{email} Wardrobe</h3>
            </div>
            <div className="clothing-list-Follower">
                {items.map((item, index) => (
                    <div key={index} className="clothing-item-Follower">
                        <div className="clothing-image-Follower">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="clothing-details-Follower">
                            <p>Type: {item.clothing_Type}</p>
                            <p>Brand: {item.brand}</p>
                        </div>
                        <IoIosHeartEmpty
                            className="fav-icon"
                            onClick={() => handleLike(item.item_ID)}
                        />
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
