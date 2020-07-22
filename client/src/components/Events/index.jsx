import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"; 
import {selectTasks,selectDate,selectIsFetchingEvents} from "../../redux/events/events.selector.js";
import {selectCurrentUser} from "../../redux/user/user.selector.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTasks,faPlus,faCaretUp} from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation} from "framer-motion";
import {CustomPlus,Container} from "./style.jsx";
import EventForm from "../EventForm";





const Events = props => {
    const tasks = useSelector(selectTasks);
    const date = useSelector(selectDate);
    const [eventFormOpen , setEventFormOpen] = useState(false);
    const isFetchingEvents = useSelector(selectIsFetchingEvents);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch(); 


    

    const handlePlusClick = () => {
        if(!eventFormOpen)
            {
              setEventFormOpen(true); 
              return;   
            }
            setEventFormOpen(false); 
    }  


  
     const displayTasks = () => {
        const TasksArr = tasks.map(task => {
        return(
                <div className="task">
                    <h4>{task.title}</h4>
                    <p>{task.task}</p>
                    <div className="task-footer">
                        <span>{task.time}</span>
                        <span><em>@{task.displayName}</em></span>
                    </div>
                    
                </div>
            );
       
        });
        return TasksArr
     }
    
     const showWholeEvents = () => {
         return (
             <>
            <div className="events-header">
            <FontAwesomeIcon icon={faTasks} />
            <span className="date">{ date ? date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(): <></>}</span>
            {tasks.length !== 0 && currentUser && currentUser.role.toLowerCase() === "teacher" ? <CustomPlus as={FontAwesomeIcon} icon={faPlus} onClick={handlePlusClick}/>  : <></> }
        </div>
        <motion.div className="content">
            {tasks.length === 0 ? (
            <div className="no-task">        
            <span className="text">{currentUser ? "There is no task for this date" : "Sign in to view tasks" }</span>
            {currentUser && currentUser.role.toLowerCase() === "teacher" ? <CustomPlus as={FontAwesomeIcon} icon={faPlus} onClick={handlePlusClick}/> : <></> }   
            </div>
            ):displayTasks()}


        </motion.div>

       {currentUser && currentUser.role.toLowerCase() === "teacher" ? <EventForm isEventFormOpen={eventFormOpen}/>: <></>}
        </>
         );
     }
    return(
    
        <Container isNoTask={tasks.length === 0}>   
            {isFetchingEvents ? 
             < ></> : showWholeEvents()
            }
        </Container>
    ); 
}

export default Events; 