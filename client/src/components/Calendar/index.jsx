import React, { useState, useEffect } from 'react';
import Cal from 'react-calendar';
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';
import {fetchEventsAsync} from "../../redux/events/events.actions.js";
import {useDispatch} from "react-redux";

const Container = styled.div`

.cal-wrapper{
  width:600px;
  min-height:100%;

  .react-calendar__navigation {
   margin-bottom:100px;
   font-size:2rem;
  }
}

.title{
  background:pink;
}

.button{
  display:none;
}
`;


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