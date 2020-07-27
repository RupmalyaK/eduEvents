import React, {Component} from "react";
import {connect} from "react-redux"; 
import {selectTasks,selectDate,selectIsFetchingEvents,selectIsPostingTask,selectIsEventFormOpen} from "../../redux/events/events.selector.js";
import {selectCurrentUser} from "../../redux/user/user.selector.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTasks,faPlus,faCaretUp} from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation} from "framer-motion";
import {CustomPlus,Container} from "./style.jsx";
import EventFormWrapper from "../EventFormWrapper";
import Task from "../Task";
import LoadingSpinner from "../LoadingSpinner";
import {setBlurOff,setBlurOn} from "../../redux/system/system.action.js"
import { setEventFormOpen,setEventFormClose } from "../../redux/events/events.actions.js";

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
  
    handlePlusClick = () => {
        const {isEventFormOpen,setEventFormOpen,setEventFormClose} = this.props;
        if(!isEventFormOpen)
            {
              setEventFormOpen();
              return;   
            }
            setEventFormClose();
    }    
    
    displayTasks = () => {
        const TasksArr = this.props.tasks.map(task => {
            const {title,task:text,displayName,time} = task;
        return(
                <Task title={title} task={text} displayName={displayName} time={time} />
            );
    
        });
        return TasksArr
    }

    showWholeEvents = () => {
        const {date,currentUser,tasks,isPostingTask,isEventFormOpen} = this.props; 
     
        return (
            <>
           <div className="events-header">
           <FontAwesomeIcon icon={faTasks} />
           <span className="date">{ date ? date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(): <></>}</span>
           {tasks.length !== 0 && currentUser && currentUser.role.toLowerCase() === "teacher" ? <CustomPlus as={FontAwesomeIcon} icon={faPlus} onClick={this.handlePlusClick}/>  : <></> }
       </div>
       <motion.div className="content">
           {tasks.length === 0 ? (
           <div className="no-task">        
           <span className="text">{currentUser ? "There is no task for this date" : "Sign in to view tasks" }</span>
           {currentUser && currentUser.role.toLowerCase() === "teacher" ? <CustomPlus as={FontAwesomeIcon} icon={faPlus} onClick={this.handlePlusClick}/> : <></> }   
           </div>
           ):this.displayTasks()}


       </motion.div>
               
      {currentUser && currentUser.role.toLowerCase() === "teacher" ? <EventFormWithLoadingSpinner isLoading={isPostingTask} isEventFormOpen={isEventFormOpen}/>: <></>}
       </>
        );
    }


    render(){
        const {isPostingTask,setBlurOn,setBlurOff,isFetchingEvents,tasks} = this.props;
        if(isPostingTask)
        {
            setBlurOn();
            
        }
        else{
            setBlurOff()
        }
        
        return(
            <Container isNoTask={tasks.length === 0}> 
                {isFetchingEvents ? 
                < ></> : this.showWholeEvents()
                }
            </Container>
        );

    }

}
   


const mapStateToProps = state => {
    return(
        {
            currentUser:selectCurrentUser(state),
            tasks:selectTasks(state),
            date:selectDate(state),
            isFetchingEvents:selectIsFetchingEvents(state),
            isPostingTask:selectIsPostingTask(state),
            isEventFormOpen:selectIsEventFormOpen(state),
        }
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setBlurOn:() => dispatch(setBlurOn()),
        setBlurOff:() => dispatch(setBlurOff()),
        setEventFormOpen:() => dispatch(setEventFormOpen()),
        setEventFormClose:() => dispatch(setEventFormClose()),
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(Events); 