import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"; 
import {selectTasks,selectDate,selectIsFetchingEvents} from "../../redux/events/events.selector.js";
import {selectCurrentUser} from "../../redux/user/user.selector.js";
import {postTaskAsync} from "../../redux/events/events.actions.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTasks,faPlus,faCaretUp} from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation} from "framer-motion";
import {Form} from "react-bootstrap";
import Button from "../CustomButton";
import {CustomPlus,EventForm,Container,CustomFormInput} from "./style.jsx";





const Events = props => {
    const tasks = useSelector(selectTasks);
    const date = useSelector(selectDate);
    const eventFormControl = useAnimation();
    const inputControl = useAnimation();
    const contentControl = useAnimation();
    const containerControl = useAnimation();
    const [text , setText] = useState(""); 
    const [taskTitle, setTaskTitle] = useState("");
    const [taskTime , setTaskTime] = useState("");
    const [eventFormOpen , setEventFormOpen] = useState(false);
    const isFetchingEvents = useSelector(selectIsFetchingEvents);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch(); 

    const maxLengthOfTextArea = 256;

    const openEventFormSequence = async () => {
       await eventFormControl.start({ y:"20%", opacity:1, transition:{duration:0.4,ease: "easeInOut"} }); 
   
      }

      const clostEventFormSequence = async () => {
       await eventFormControl.start({ y:"109%", opacity:1, transition:{duration:0.4,ease: "easeInOut"} }); 
      }

    

    const handlePlusClick = () => {
        if(!eventFormOpen)
            {
              openEventFormSequence(); 
              setEventFormOpen(true); 
              return;   
            }
            clostEventFormSequence();
            setEventFormOpen(false); 
    }  


    const handleWriteTask = e => {
        setText(e.target.value);
    }

    const handleTaskSubmit = e => {
        dispatch(postTaskAsync(date,taskTitle, text,taskTime)); 
        if(taskTitle.length <= 5 || text.length <= 20 || !taskTime)
            {
                alert("Error submitting task");
                clostEventFormSequence();
                return;
            }
        setText("");
        setTaskTitle("");
        setTaskTime("");
        clostEventFormSequence();
    }
     useEffect(() => {
        
     },[tasks]);

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
            {tasks.length !== 0 && currentUser && currentUser.role === "teacher" ? <CustomPlus as={FontAwesomeIcon} icon={faPlus} onClick={handlePlusClick}/>  : <></> }
        </div>
        <motion.div className="content"  animate={contentControl}>
            {tasks.length === 0 ? (
            <div className="no-task">        
            <span className="text">{currentUser ? "There is no task for this date" : "Sign in to view tasks" }</span>
            {currentUser && currentUser.role === "teacher" ? <CustomPlus as={FontAwesomeIcon} icon={faPlus} onClick={handlePlusClick}/> : <></> }   
            </div>
            ):displayTasks()}


        </motion.div>

       {currentUser && currentUser.role === "teacher" ? <EventForm initial={{y:"109%"}} animate={eventFormControl}>
                    <FontAwesomeIcon icon={faCaretUp}/>
                    <h4>Post a new task</h4>
                    
                    <Form.Group controlId="writeTask" style={{marginTop:"10px",border:"5%"}}>
                            <CustomFormInput type="text" label="Title" value={taskTitle} setState={setTaskTitle}  required /> 
                            <Form.Label>Write the task (Limit:{maxLengthOfTextArea - text.length} more characters)</Form.Label>
                            <Form.Control as="textarea" rows="3" maxLength={256}  onChange={handleWriteTask} style={{height:"200px",marginBottom:"50px"}} requited/>
                            <CustomFormInput type="time" label="Time" value={taskTime} setState={setTaskTime} required /> 
                            <Button onClick= {handleTaskSubmit}>Post the task</Button>
                    </Form.Group>
        </EventForm>: <></>}
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