import React from "react"; 
import Calendar from "../../components/Calendar";
import Events from "../../components/Events"; 
import {Container} from "./style.jsx";



const Homepage = () => {
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



