import React, {Component} from "react";
import {connect} from "react-redux"; 
import {selectDate,selectPostingTaskError} from "../../redux/events/events.selector.js";
import {selectCurrentUser} from "../../redux/user/user.selector.js";
import {postTaskAsync} from "../../redux/events/events.actions.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTasks,faPlus,faCaretUp} from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation} from "framer-motion";
import {Form} from "react-bootstrap";
import Button from "../CustomButton";

import {Container,CustomFormInput,Errors} from "./style.jsx";


/*const EventForm = props => {
    const {isEventFormOpen} = props; 
    const eventFormControl = useAnimation();
    const [text , setText] = useState(""); 
    const [taskTitle, setTaskTitle] = useState("");
    const [taskTime , setTaskTime] = useState("");
    const [eventFormOpen , setEventFormOpen] = useState(false);
    const dispatch = useDispatch(); 
    const date = useSelector(selectDate);
    const postingTaskErrors = useSelector(selectpostingTaskError);
   

    const maxLengthOfTextArea = 120;

    useEffect(() => {
        if(isEventFormOpen || postingTaskErrors)
            {
                openEventFormSequence();
                return;
            }
            closeEventFormSequence();

    },[isEventFormOpen,postingTaskErrors]);

    const openEventFormSequence = async () => {
       await eventFormControl.start({ y:"20%", opacity:1, transition:{duration:0.4,ease: "easeInOut"} }); 
   
      }

      const closeEventFormSequence = async () => {
       await eventFormControl.start({ y:"109%", opacity:1, transition:{duration:0.4,ease: "easeInOut"} }); 
      }


    const handleWriteTask = e => {
        setText(e.target.value);
    }

    const handleTaskSubmit = e => {
        dispatch(postTaskAsync(date,taskTitle, text,taskTime)); 
        if(taskTitle.length <= 5 || text.length <= 20 || !taskTime)
            {
                return;
            }
        setText("");
        setTaskTitle("");
        setTaskTime("");

    }


    const handleTaskCancel = e => {
        closeEventFormSequence();
    }

    const displayErrors = () => {
        const Errors = postingTaskErrors.map( error =>{
            return (<span className="error">{error}</span>)
        }
        );
        return Errors;
    }


}

export default EventForm;
*/


/**
 *   const {isEventFormOpen} = props; 
    const eventFormControl = useAnimation();
    const [text , setText] = useState(""); 
    const [taskTitle, setTaskTitle] = useState("");
    const [taskTime , setTaskTime] = useState("");
    const [eventFormOpen , setEventFormOpen] = useState(false);
    const dispatch = useDispatch(); 
    const date = useSelector(selectDate);
    const postingTaskErrors = useSelector(selectpostingTaskError);
 */
class EventForm extends Component {
    constructor(props)
        {
            super(props);
            const maxLengthOfTextArea = 120;
        }

        
        
        state = {
            text:"",
            taskTitle:"",
            taskTime:"",
            eventFormOpen:false,
        }

        handleWriteTask = e => {
           // setText(e.target.value);
            this.setState({text:e.target.value});
        }

        handleTaskSubmit = e => {
            const {date} = this.props.date;
            const {text,taskTitle,taskTime,eventFormOpen} = this.state;
            this.props.postTaskAsync(date,taskTitle, text,taskTime); 
            if(taskTitle.length <= 5 || text.length <= 20 || !taskTime)
                {
                    return;
                }
            this.setState({
                text:"",
                taskTitle:"",
                taskTime:"",
            });    
      
        }
        
        handleTaskCancel = e => {
           // closeEventFormSequence();
        }


        displayErrors = () => {
            const Errors = this.props.postingTaskErrors.map( error =>{
                return (<span className="error">{error}</span>)
            }
            );
            return Errors;
        }

      

        render()
            {
                const {postingTaskErrors} = this.props;
                const {taskTitle,text,taskTime} = this.state;
                return(
                    <Container initial={{y:"109%"}} >
                                <FontAwesomeIcon icon={faCaretUp}/>
                                {postingTaskErrors ? <Errors>
                                    <h6 className="heading">Error posting Task</h6>
                                    {this.displayErrors()} 
                                </Errors>:<></>} 
                                <h4>Post a new task</h4>
                                <Form.Group controlId="writeTask" style={{marginTop:"10px",border:"5%"}}>
                                        <CustomFormInput type="text" label="Title" value={taskTitle} setState={this.setTaskTitle}  required /> 
                                        <Form.Label>Write the task (Limit:{this.maxLengthOfTextArea - text.length} more characters)</Form.Label>
                                        <Form.Control as="textarea" rows="3" maxLength={120}  onChange={this.handleWriteTask} style={{height:"200px",marginBottom:"50px"}} requited/>
                                        <CustomFormInput type="time" label="Time" value={taskTime} setState={this.setTaskTime} required /> 
                                        <div className="buttons" className="d-flex justify-content-center">
                                             <Button onClick= {this.handleTaskSubmit} style={{marginRight:"25px",width:"240px"}}>Post</Button>
                                             <Button onClick= {this.handleTaskCancel} style={{width:"240px"}}>Cancel</Button>
                                        </div>
                                        
                                </Form.Group>
                    </Container>
                );               
            }

}

const mapStateToProps = state  => {
    return {
         date:selectDate(state),
         postingTaskErrors:selectPostingTaskError(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        postTask:(date,taskTitle, text,taskTime) => dispatch(postTaskAsync(date,taskTitle, text,taskTime)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(EventForm);

