import actionTypes from "./events.type.js";
import axios from "axios";


const fetchEventsStart = () => {
    return {type:actionTypes.FETCH_EVENTS_START};
}

const fetchEventsFailure = (error) => {
    return {type:actionTypes.FETCH_EVENTS_FAILURE, payLoad:error };
}

const fetchEventsSuccess = (events,date) => {
    return {type:actionTypes.FETCH_EVENTS_SUCCESS,payLoad:{tasks:events,date}};
}

export const fetchEventsAsync = (date, time) => {
    return async (dispatch, getState) => {
        dispatch(fetchEventsStart());
        try{
            const accessToken = getState().user.currentUser.accessToken;
          
            const {data:events} = await axios({
                url:"/api/events",
                method:"GET",
                params:{
                  date:date.toDateString(),
                  time,
                },
                headers: {
                    authorization:"Bearer " + accessToken,
                }
            });
            dispatch(fetchEventsSuccess(events,date));
           }
        catch(error)
            {
                dispatch(fetchEventsFailure(error));
            }
    }
}

const postTaskStart = () => {
    return {type:actionTypes.POST_TASK_START};
}

const postTaskFailure = (error) => {
    return {type:actionTypes.POST_TASK_FAILURE,payLoad:error};
}

const postTaskSuccess = (tasks,date) => {
    return {type:actionTypes.POST_TASK_SUCCESS, payLoad:{tasks,date}}; 
}

export const postTaskAsync =  (date, taskTitle, task, time) => {
    return async (dispatch,getState) => {
        dispatch(postTaskStart()); 
        try{
            const accessToken = getState().user.currentUser.accessToken;
            const teacherId = getState().user.currentUser._id; 
    
            const {data:tasks} = await axios(
                {
                    method:"POST",
                    url:"/api/events",
                    data:{
                        date:date.toDateString(),
                        task,
                        time,
                        taskTitle,
                        teacherId,
                    },
                    headers: {
                        authorization:"Bearer " + accessToken,
                    }
                }
            );
            dispatch(postTaskSuccess(tasks,date))
        }
        catch(error)
            {
                dispatch(postTaskFailure(error.response.data.errors)); 
            }
    }
}


export const clearTasks = () => {
    return {type:actionTypes.CLEAR_TASK};
}