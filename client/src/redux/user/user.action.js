import userActionTypes from "./user.types.js";
import axios from "axios";

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
        const {data:currentUser} = await axios({
            method:"POST",
            url:"/api/auth/signin",
            data:{
                email,
                password,
            }
        });
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

/*export const checkSessionAsync = () => { 
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
*/
export const signOut = () => {
    return {type:userActionTypes.SIGN_OUT}
}

export const signUpStart = () =>
    {
        return {
            type:userActionTypes.SIGN_UP_START,
        };
    }

export const signUpSuccess = (currentUser) => {
    return {
        type:userActionTypes.SIGN_UP_SUCCESS,
        payLoad:currentUser,
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
            const {email ,password, displayName, role} = userInfo;
            try{
                const {data:currentUser} = await axios({
                    method:"POST",
                    url:"/api/auth/signup",
                    data:{
                        email,
                        password,
                        displayName,
                        role
                    }
                });
             //   console.log("CHECK CURRENT USER", currentUser);
                dispatch(signUpSuccess(currentUser));
            }
            catch(error)
            {
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








