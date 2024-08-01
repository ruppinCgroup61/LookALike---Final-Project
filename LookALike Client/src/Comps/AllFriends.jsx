import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NaviBarFooter from './NaviBarFooter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import '../CSS/AllFriends.css';

const AllFriends = () => {
    const [followers, setFollowers] = useState([]);
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userEmail = sessionStorage.getItem('email');

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await fetch(`https://localhost:7215/api/UserFollower/followers/${userEmail}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setFollowers(data.filter(follower => follower.follower_Email === userEmail));
            } catch (error) {
                console.error('Error fetching followers:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch("https://localhost:7215/api/User", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setUserList(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchFollowers(), fetchUsers()]);
            setLoading(false);
        };

        fetchData();
    }, [userEmail]);

    const goToFollowerCloset = (email) => {
        const user = userList.find(user => user.email === email);
        if (user) {
            navigate(`/follower-closet/${email}`, { state: { fullName: `${user.firstName} ${user.lastName}` } });
        }
    };

    const getUserImage = (email) => {
        const user = userList.find(user => user.email === email);
        return user ? user.image : 'default-image-path'; // Default image path if user or image not found
    };

    const getUserFullName = (email) => {
        const user = userList.find(user => user.email === email);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="all-friends-container">
            <div className="AF_Header">
                <button
                    onClick={() => {
                        navigate("/SocialNetwork");
                    }}
                    className="AF-button"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h2>All Friends</h2>
            </div>
            <div className="all-friends-list">
                {followers.map((follower, index) => (
                    <div key={index} className="all-friend-card-container">
                        <div
                            className="all-friend-card"
                            onClick={() => goToFollowerCloset(follower.following_Email)}
                        >
                            <img
                                src={getUserImage(follower.following_Email)}
                                alt={`Profile of ${getUserFullName(follower.following_Email)}`}
                                className="all-friend-image"
                            />
                            <div className="all-friend-info">
                                <span className="all-friend-name">{getUserFullName(follower.following_Email)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
            <NaviBarFooter /></div>
        </div>
    );
};

export default AllFriends;
