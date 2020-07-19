import userActionTypes from "./user.types.js";
import {auth,createUserProfileDoc} from "../../firebase/firebase.util.js";

export const signInStart = () => {
    return {type:userActionTypes.SIGN_IN_START,         
    };
}

export const signInSuccess = (currentUser) => {
    return {type:userActionTypes.SIGN_IN_SUCCESS,
            payLoad:currentUser};
}

export const signInFailure = error => {
    return {type:userActionTypes.SIGN_IN_FAILURE,
            payLoad:error};
}

export const signInUserWithEmailAndPasswordAsync = (email , password) => {
  return async (dispatch) => {
    dispatch(signInStart());
    try{
    const currentUser = await auth.signInWithEmailAndPassword(email , password); 
    dispatch(signInSuccess(currentUser));
    }
    catch(error)
    {
        dispatch(signInFailure(error));
    }
  }
}


export const checkSessionStart = () => { 
    return {
        type:userActionTypes.CHECK_SESSION_START,
    };
}
export const checkSessionSuccess = (user) =>
    {
        return {
            type:userActionTypes.CHECK_SESSION_SUCCESS,
            payLoad:user
        };
    }

export const checkSessionFailure = (error) => {
    return {
        type:userActionTypes.CHECK_SESSION_FAILURE,
        sessionError:error,
    }
}    

export const setUnsubscriber = (unsubscriberFR) => {
    return {
        type:userActionTypes.SET_UNSUBSCRIBER,
        payLoad:unsubscriberFR,
    }
}

export const checkSessionAsync = () => { 
    return async (dispatch) => {
        dispatch(checkSessionStart());
        let unsubscriber = null; 
        unsubscriber = auth.onAuthStateChanged(
            async userAuth => {
                if(userAuth)
                {         
                    const userRef = await createUserProfileDoc(userAuth);     
                    userRef.onSnapshot(snapshot => { 
                        dispatch(checkSessionSuccess({
                        id:snapshot.id,
                        ...snapshot.data()
                        }, )); 
                    });
                    return;
                }
                 dispatch(checkSessionSuccess(null));   
                return;
                }
            ); 

            dispatch(setUnsubscriber(unsubscriber))
        }
}

export const signOutStart = () => {
return {
    type:userActionTypes.SIGN_OUT_START,
}
}

export const signOutSuccess = data => {
    return {
        type:userActionTypes.SIGN_OUT_SUCCESS,
        payLoad:data,
    }
}

export const signOutFailure = error => {
    return {
        type:userActionTypes.SIGN_OUT_FAILURE,
        payLoad:error,
    };
}

export const signOutAsync = () => {
    return async dispatch => {
        dispatch(signOutStart());
        try{
        await auth.signOut();
        dispatch(signOutSuccess());
        }
        catch(error)
            {
                dispatch(signOutFailure(error));
            }
    }
}

export const signUpStart = () =>
    {
        return {
            type:userActionTypes.SIGN_UP_START,
        };
    }

export const signUpSuccess = () => {
    return {
        type:userActionTypes.SIGN_UP_SUCCESS,
    };
} 

export const signUpFailure = (error) => {
    return {
        type:userActionTypes.SIGN_UP_FAILURE,
        payLoad:error
    };
}

export const signUpAsync = (userInfo) => {
    return async dispatch => {
            dispatch(signUpStart()); 
            const {email ,password, displayName, user, role} = userInfo;
           
            try{
                const {user} = await auth.createUserWithEmailAndPassword(email , password);
                await createUserProfileDoc(user , {displayName,role:role.toLowerCase()});
                dispatch(signUpSuccess());
            }
            catch(error){
                dispatch(signUpFailure(error));
            }
    }
}


export const clearSignInError = () => {
    return {type:userActionTypes.SIGN_IN_ERROR_CLEAR};
}

export const clearSignUpError = () => {
    return {type:userActionTypes.SIGN_UP_ERROR_CLEAR};
}

export const clearSignOutError = () => {
    return {type:userActionTypes.SIGN_OUT_ERROR_CLEAR};
}








