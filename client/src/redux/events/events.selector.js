import {createSelector} from "reselect"; 


const selectEvents = state => state.events; 

export const selectTasks = createSelector(selectEvents , (events) => events.tasks);

export const selectIsFetchingEvents= createSelector(selectEvents , (events) => events.selectIsFetchingEvents);

export const selectFetchingEventsError = createSelector(selectEvents , (events) => events.fetchingEventsError);

export const selectDate = createSelector(selectEvents , (events) => events.date);


