import React, { useState, useEffect } from 'react';
import NaviBarFooter from './NaviBarFooter';
import { IoPeopleSharp, IoShirtSharp } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { useNavigate } from 'react-router-dom';
import '../CSS/SocialNetwork.css';

export default function SocialNetwork() {
  const [open, setOpen] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [followers, setFollowers] = useState([]);
  const [validEmail, setValidEmail] = useState(false); // State to track email validity
  let UserFollower = null;
  let userEmail = sessionStorage.getItem('email');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://localhost:7215/api/UserFollower/followers/${userEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setFollowers(data.filter(follower => follower.follower_Email === userEmail));
        console.log('followers', followers);
      })
      .catch(error => {
        console.log(userEmail);
        console.error('Error fetching followers:', error);
      });
  }, [userEmail]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddFriend = () => {
    UserFollower = {
      Follower_Email: userEmail, //מי העוקב
      Following_Email: friendEmail, //מי הנעקב
    };
    fetch('https://localhost:7215/api/UserFollower', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(UserFollower),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Catch Error');
        }
        return response.json();
      })
      .then(data => {
        if (data === 1) {
          setSnackbarMessage(`Friend added successfully`);
        } if (data === -1) {
          setSnackbarMessage(`Friend already exists`);
        }
        if (data === 0) {
          setSnackbarMessage(`Email does not exist in the system`);
        }
        setOpenSnackbar(true);
        setTimeout(() => {
          setOpenSnackbar(false);
          window.location.reload();
        }, 2000);
      })
      .catch(error => {
        console.error('Error during add new friend:', error);
      });
    handleClose();
  };

  const handleEmailChange = event => {
    const email = event.target.value;
    setFriendEmail(email);
    // Email validation check
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    setValidEmail(isValidEmail);
  };

  const goToFollowerCloset = email => {
    navigate(`/follower-closet/${email}`);
  };

  return (
    <div className="SN_Container">
      <div className="SN_Header">
        <h2 className="HeaderSocial">Social Network</h2>
        <IoPeopleSharp className="header-icon" />
      </div>
      <div className="SN_Center">
        <div className="add-friend" onClick={handleClickOpen}>
          <IoShirtSharp className="wardrobe-icon" />
          <span>Add New Friend</span>
        </div>
        <div className="followers-slider">
          <h2>Enter Friend Wardrobe:</h2>
          {followers.map((follower, index) => (
            <div
              key={index}
              className="follower-card"
              onClick={() => goToFollowerCloset(follower.following_Email)}
            >
              <FaUser className="follower-icon" />
              <span>@{follower.userYouFollow_Full_Name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="SN_Footer">
        
        <NaviBarFooter />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Friend</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="friend-email"
            label="Friend's Email Address"
            type="email"
            fullWidth
            value={friendEmail}
            onChange={handleEmailChange}
            error={friendEmail !== '' && !validEmail} // Show error if email is invalid
            helperText={friendEmail !== '' && !validEmail ? 'Invalid email address' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddFriend} color="primary" disabled={!validEmail}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <SnackbarContent
          sx={{
            backgroundColor: '#fff',
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
            border: '1px solid #d2d2d2',
            textAlign: 'center',
            fontFamily: 'Urbanist, sans-serif',
            fontSize: '20px',
            color: '#333',
            fontWeight: 'bold',
            padding: '10px 20px',
          }}
          message={snackbarMessage}
        />
      </Snackbar>
    </div>
  );
}
