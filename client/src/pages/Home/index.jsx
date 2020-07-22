import React,{useEffect} from "react"; 
import Calendar from "../../components/Calendar";
import Events from "../../components/Events"; 
import {Container} from "./style.jsx";
import {clearSignUpError} from "../../redux/user/user.action";
import {useDispatch} from "react-redux";


const Homepage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(clearSignUpError());
    },[]);
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



