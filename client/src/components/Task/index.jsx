import React from "react";
import {Container} from "./style.jsx";

const Task = props => {
    const {title,task,displayName,time} = props; 
    return (
               <Container>
                    <h4>{title}</h4>
                    <p>{task}</p>
                    <div className="task-footer">
                        <span>{time}</span>
                        <span><em>@{displayName}</em></span>
                    </div>
                </Container>
            );
}


export default Task; 