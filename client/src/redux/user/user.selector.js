import {createSelector} from "reselect"; 


export const selectUser = state => state.user; 

export const selectCurrentUser = createSelector(selectUser , (user) => user.currentUser);

export const selectUnsubscriber = createSelector(selectUser, (user) => user.unsubscriberFR); 

export const selectIsSigningIn = createSelector(selectUser, state => state.isSigningIn); 

export const selectSignInError = createSelector(selectUser, state => state.signInError);

export const selectIsSigningUp = createSelector(selectUser, state => state.isSigningUp); 

export const selectSignUpError = createSelector(selectUser, state => state.signUpError);

export const selectIsCheckingSession = createSelector(selectUser, state => state.isCheckingSession); 
