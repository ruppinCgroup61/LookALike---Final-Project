import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NaviBarFooter from './NaviBarFooter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
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
                console.log(data);
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

    const countEntriesForFriendCloset = async (adminUserMail, closetMail) => {
        try {
            const response = await fetch(`https://localhost:7215/api/Algorithm/AddOrUpdateEntry?adminUserMail=${adminUserMail}&closetMail=${closetMail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update entry count');
            }

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Error counting entries:', error);
        }
    };

    const goToFollowerCloset = (email) => {
        countEntriesForFriendCloset(userEmail, email); // Call the function to update entry count
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

    const deleteFriend = async (friendEmail) => {
        try {
            const response = await fetch(`https://localhost:7215/api/UserFollower/deleteFriend?adminMail=${encodeURIComponent(userEmail)}&friendMail=${encodeURIComponent(friendEmail)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response); // Log the response for debugging

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete friend: ${errorText}`);
            }

            setFollowers(followers.filter(follower => follower.following_Email !== friendEmail));
        } catch (error) {
            console.error('Error deleting friend:', error);
        }
    };

    if (loading) {
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
                <div className='AF_Center'>
                    <div className="all-friends-list">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="all-friend-card-container">
                                <div className="all-friend-card">
                                    <div className="skeleton skeleton-image"></div>
                                    <div className="all-friend-info">
                                        <div className="skeleton skeleton-name"></div>
                                    </div>
                                </div>
                                <div className="delete-friend-button">
                                    <div className="skeleton skeleton-delete-icon"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <NaviBarFooter />
                </div>
            </div>
        );
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
            <div className='AF_Center'>
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
                            <div className="delete-friend-button" onClick={() => deleteFriend(follower.following_Email)}>
                                <FontAwesomeIcon icon={faTimes} className="delete-friend-icon" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <NaviBarFooter />
            </div>
        </div>
    );
};

export default AllFriends;
