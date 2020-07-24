import actionTypes from "./events.type.js"; 

const INITIAL_STATE = {
    tasks:[],
    isFetchingEvents:false,
    fetchingEventsError:null, 
    date:null,
    isPostingTask:false,
    postingTaskError:null,
};

const eventsReducer = (state = INITIAL_STATE, action) => {
    const {type, payLoad} = action; 
    console.log(state);
    switch(type)
        {   
            case actionTypes.FETCH_EVENTS_START:
                  return {...state, isFetchingEvents:true};
            case actionTypes.FETCH_EVENTS_FAILURE:
                   return {...state, isFetchingEvents:false, fetchingEventsError:payLoad};
            case actionTypes.FETCH_EVENTS_SUCCESS:
                    const {tasks, date}  = payLoad; 
                    return {...state, isFetchingEvents:false, fetchingEventsError:null, tasks,date};  

            case actionTypes.POST_TASK_START:
                    return {...state, isPostingTask:true};
            case actionTypes.POST_TASK_FAILURE:
                    return {...state, isPostingTask:false , postingTaskError:payLoad};
            case actionTypes.POST_TASK_SUCCESS:
                      const {tasks:newTasks, date:newDate}  = payLoad; 
                      return {...state,isPostingTask:false, postingTaskError:null,tasks:newTasks, date:newDate};   
                      
             case actionTypes.CLEAR_TASK:
                        return{...state,tasks:[]};         
            default: return state;
        }
}

export default eventsReducer; 