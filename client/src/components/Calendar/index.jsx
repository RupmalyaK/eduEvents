import React, { useState, useEffect } from 'react';
import Cal from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {fetchEventsAsync} from "../../redux/events/events.actions.js";
import {useDispatch} from "react-redux";
import {Container} from "./style.jsx";




const Calendar = () => {
 const [date, setDate] = useState(new Date(Date.now()));
 const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(fetchEventsAsync(date));
  },[]);
  const handleChange = date => {
    setDate(date);
    dispatch(fetchEventsAsync(date));
  }
    return (
      <Container>
        <Cal
          onChange={handleChange}
          value={date}
          className="cal-wrapper"
        />
      </Container>
    );
}

export default Calendar;