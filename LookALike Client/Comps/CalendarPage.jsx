import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = ({ selectedTop, selectedBottom }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddToCalendar = () => {
    // כאן תוכלי להוסיף את הלוגיקה שלך להוספת הבגדים לתאריך שנבחר
    console.log("Added outfit to date:", date);
    console.log("Selected top:", selectedTop);
    console.log("Selected bottom:", selectedBottom);
  };

  return (
    <div>
      <h2>Calendar</h2>
      <h4 className='h4'>Choose a date on which you will wear your new outfit and decide whether to receive a notification</h4>
      <div className='calendar'>
        <Calendar
          onChange={handleDateChange}
          value={date}
        />
      </div>
      <div>
        <button onClick={handleAddToCalendar}>Add Outfit to Calendar</button>
      </div>
    </div>
  );
};

export default CalendarPage;
