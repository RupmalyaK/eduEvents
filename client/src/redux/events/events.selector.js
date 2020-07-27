import {createSelector} from "reselect"; 


const selectEvents = state => state.events; 

export const selectTasks = createSelector(selectEvents , (events) => events.tasks);

export const selectIsFetchingEvents= createSelector(selectEvents , (events) => events.selectIsFetchingEvents);

export const selectFetchingEventsError = createSelector(selectEvents , (events) => events.fetchingEventsError);

export const selectIsPostingTask = createSelector(selectEvents, event => event.isPostingTask);

export const selectPostingTaskError  = createSelector(selectEvents, event => event.postingTaskError);

export const selectDate = createSelector(selectEvents , (events) => events.date);

export const selectIsEventFormOpen = createSelector(selectEvents , (events) => events.isEventFormOpen);


