import React, {Component} from "react";
import {connect} from "react-redux"; 
import {selectTasks,selectDate,selectIsFetchingEvents,selectIsPostingTask} from "../../redux/events/events.selector.js";
import {selectCurrentUser} from "../../redux/user/user.selector.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTasks,faPlus,faCaretUp} from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation} from "framer-motion";
import {CustomPlus,Container} from "./style.jsx";
import EventFormWrapper from "../EventFormWrapper";
import Task from "../Task";
import LoadingSpinner from "../LoadingSpinner";
import {setBlurOff,setBlurOn} from "../../redux/system/system.action.js"

const EventFormWithLoadingSpinner = LoadingSpinner(EventFormWrapper);




/*const Events = props => {
    const tasks = useSelector(selectTasks);
    const date = useSelector(selectDate);
    const [eventFormOpen , setEventFormOpen] = useState(false);
    const isFetchingEvents = useSelector(selectIsFetchingEvents);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch(); 
    const isPostingTask = useSelector(selectIsPostingTask);


  
    useEffect(() => {
        if(isPostingTask)
            {
                dispatch(setBlurOn());
                return;
            }
            dispatch(setBlurOff());

    },[isPostingTask]);

    useEffect(() => {
      setEventFormOpen(false);
    },[tasks]);

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
            const {title,task:text,displayName,time} = task;
        return(
                <Task title={title} task={text} displayName={displayName} time={time} />
            );
       
        });
        return TasksArr
     }
     console.log("IS EVENT FORM OPEN", eventFormOpen);
     const 
  
    return(
    
        <Container isNoTask={tasks.length === 0}> 

            {isFetchingEvents ? 
             < ></> : showWholeEvents()
            }
        </Container>
    ); 
}*/

class Events extends Component {
    state = {
        eventFormOpen:false,
    };

    handlePlusClick = () => {

        if(!eventFormOpen)
            {
              setEventFormOpen(true); 
              return;   
            }
            setEventFormOpen(false); 

    }    
    
    displayTasks = () => {
        const TasksArr = tasks.map(task => {
            const {title,task:text,displayName,time} = task;
        return(
                <Task title={title} task={text} displayName={displayName} time={time} />
            );
    
        });
        return TasksArr
    }

    showWholeEvents = () => {
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
               
      {currentUser && currentUser.role.toLowerCase() === "teacher" ? <EventFormWithLoadingSpinner isLoading={isPostingTask} isEventFormOpen={eventFormOpen}/>: <></>}
       </>
        );
    }

    render(){

        return(
            <Container isNoTask={tasks.length === 0}> 
                {isFetchingEvents ? 
                < ></> : showWholeEvents()
                }
            </Container>
        );

    }




}
   

//import {selectTasks,selectDate,selectIsFetchingEvents,selectIsPostingTask} from "../../redux/events/events.selector.js";
const mapStateToProps = state => {
    return(
        {
            currentUser:selectCurrentUser(state),
            tasks:selectTasks(state),
            date:selectDate(state),
            isFetchingEvents:selectIsFetchingEvents(state),
            isPostingTask:selectIsPostingTask(state),
        }
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setBlurOn:() => dispatch(setBlurOn()),
        setBlurOff:() => dispatch(setBlurOff()),

    };
}


export default connect(mapStateToProps,mapDispatchToProps)(Events); 