import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../CSS/Calendar.css';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { useNavigate } from 'react-router-dom';

// import Modal from './Modal'; // Import the modal component


const CalendarPage = ({ selectedTop, selectedBottom }) => {
  const [date, setDate] = useState(new Date());
  // const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const userEmail = sessionStorage.getItem("email");

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigateTo = useNavigate();

  const handleAddToCalendar = async () => {
    const outfit = {
      lookId: -1,
      topSelection_ItemId: selectedTop.item_ID,
      buttomSelection_ItemId: selectedBottom.item_ID,
      topSelection_Image: selectedTop.image,
      buttomSelection_Image: selectedBottom.image,
      createdDate: new Date().toISOString(),
      calendarDate: date.toISOString(),
      userEmail: userEmail
    };

    console.log("LOOK:", outfit);
    try {
      const response = await fetch('https://localhost:7215/api/ManualLook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(outfit),
      });

      if (response.ok) {
        // setShowModal(true); // Show the modal on success
        // alert('save outfit');
        setSnackbarMessage(`The LOOK was added successfully!`);
        setOpenSnackbar(true);
        setTimeout(() => {
          setOpenSnackbar(false);
          navigateTo("/HomePage");
        }, 2000);
      } else {
        alert('Failed to save outfit');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving outfit');
    }

    console.log("LOOK:", outfit);
  };

  const tileDisabled = ({ date, view }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div>
      <h2>Add the Look to your Calendar</h2>
      <h4 className='h4'>Choose a date on which you will wear your new outfit and decide whether to receive a notification</h4>
      <div className='calendar'>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileDisabled={tileDisabled}
        />
      </div>
      <div className='BTNCal'>
        <button onClick={handleAddToCalendar}>Add Outfit to Calendar</button>
      </div>
      {/* <Modal show={showModal} onClose={() => setShowModal(false)} message="The look was added successfully!" /> */}
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
};

export default CalendarPage;
