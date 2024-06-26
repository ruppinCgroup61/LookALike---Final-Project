import React, { useState } from 'react';
import NaviBarFooter from "./NaviBarFooter";
import { IoPeopleSharp } from "react-icons/io5";
import { IoShirtSharp } from "react-icons/io5"; // Import the wardrobe icon
// import {DialogContent, DialogActions, Button, TextField } from '@mui/material/Dialog';; // Import Dialog components
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import "../src/SocialNetwork.css";


export default function SocialNetwork() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='SN_Container'>
      <div className='SN_Header'>
        <h2>Social Network</h2>
        <IoPeopleSharp className='header-icon' />
      </div>
      <div className='SN_Center'>
        <div className='add-friend' onClick={handleClickOpen}>
          <IoShirtSharp className='wardrobe-icon' />
          <span>Add New Friend</span>
        </div>
      </div>
      <div className='SN_Footer'>
        <NaviBarFooter />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Friend</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Friend's Email"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
