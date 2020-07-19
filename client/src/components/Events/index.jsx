import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux"; 
import {selectTasks,selectDate,selectIsFetchingEvents} from "../../redux/events/events.selector.js";
import {selectCurrentUser} from "../../redux/user/user.selector.js";
import {postTaskAsync} from "../../redux/events/events.actions.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTasks,faPlus,faCaretUp} from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation} from "framer-motion";
import {Form} from "react-bootstrap";
import FormInput from "../FormInput";
import Button from "../CustomButton";


const Container = styled.div`
position:relative;
min-height:100%;
width:700px;
overflow:hidden;
display:flex;
flex-direction:column;
background:${props => props.theme.secondaryBackgroundColor};

.events-header{
    font-size:2rem;
    display:flex;
    justify-content:center;
    align-items:center;
    height:20%;
    z-index:10;
    background:${props => props.theme.secondaryBackgroundColor};
    color:${props => props.theme.secondaryTextColor};
    .date{
        margin-left:20px;
        color:${props => props.theme.primaryTextColor} ;
    }
    .fa-plus{
        position:absolute;
        top:5%;
        right:2%;
    }
    
}
.content{
    overflow:auto;
    font-weight:100;
    height:80%;
    z-index:5;
    background:${props => props.theme.primaryBackgroundColor};
    display:flex;
    font-size:${props => props.isNoTask ? "2.5rem" : "1.2rem"};
    justify-content:${props => props.isNoTask ? "center" : "flex-start"};
    align-items:${props => props.isNoTask ? "center":"flex-start"} ;
    flex-direction:column;
}

.no-task{
    display:flex;
    flex-direction:column;
    align-items:center;

    .text{
        margin-bottom:25px;
    }
}

.task{
    width:100%;
    color:${props => props.theme.primaryTextColor};
    display:flex;
    justify-content:flex-start;
    margin-bottom:20px;
    height:200px;
    flex-direction:column;
    position:relative;
    border:1px solid ${props => props.theme.primaryBorder};
    h4{
        text-align:center;
        display:flex;
        justify-content:center;
        align-items:center;
        height:34px;
        padding:10px;
        
    }
    .task-footer{
        position:absolute;
        bottom:0;
        right:5%;

        span{
            margin-left:25px;
        }
    }
    p{
        margin:5px 20px 10px 20px;
        padding:5px;
        font-weight:200;
        height:55%;
        background:white;
    }
}
`;

const EventForm = styled(motion.div)`
width:100%;
height:90%;
background:${props => props.theme.secondaryBackgroundColor};
position:absolute;
z-index:90;
display:flex;
flex-direction:column;
padding:20px 20px;


.fa-caret-up{
    font-size:5rem;
    width:75px;
    height:75px;
    padding:0;
   position:absolute;
   top:-5%;
   left:45%;
   color:${props => props.theme.secondaryBackgroundColor};
}

h4{
    align-self:center;
    margin-bottom:10%;
    color:${props => props.theme.primaryTextColor}
   
}


`;

const CustomPlus = styled.div`
    font-size:4rem;
    background:${props => props.theme.primaryButtonColor};
    padding:10px;
    border-radius:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    width:50px;
    height:50px;
    cursor:pointer;
    color:${props => props.theme.secondaryButtonColor};
    opacity:80%;
    &:hover{
        opacity:100%;
    }
`
const CustomFormInput = styled(FormInput)`
min-width:100%;
margin-bottom:25px;
`;


/**justify-content:${props => props.isNoTask ? "center" : "flex-start"}
    align-items:${props => props.isNoTask ? "center":"flex-start"} */

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
            <span className="text">There is no task for this date</span>
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