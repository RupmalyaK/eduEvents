import React, {useState, useEffect} from "react"; 
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {} from"@fortawesome/free-solid-svg-icons";
import {motion, useAnimation} from "framer-motion";
import {selectTasks} from "../../redux/events/events.selector.js";
import {Row,Col} from "react-bootstrap";
import styled from "styled-components";
import Calendar from "../../components/Calendar";
import Events from "../../components/Events"; 

const Container = styled.div`
height:100vh;
display:flex;
justify-content:center;
align-items:center;


.calendar-and-events{
  display:flex;
  height:1000px;
}
`;

const Homepage = () => {

    
    useEffect(() => {
      
    }, []);


  
 
  
    return (
      <Container style={{overflow:"hidden"}}>
        <div className="calendar-and-events">
           { <Events/>}
            <Calendar/>
        </div>
        

       
      </Container>
      
   
    );
}

export default Homepage; 



