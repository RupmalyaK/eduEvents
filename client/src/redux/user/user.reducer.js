import userActionTypes from "./user.types.js";

const INITIAL_STATE = {
currentUser:null,
sessionError:"",
unsubscriberFR:null,
isCheckingSession:false, 
isSigningUp:false,
isSigningIn:false, 
isSigningOut:false,
signInError:false,
signUpError:null, 
signOutError:null,
};

const userReducer = (state = INITIAL_STATE , action) => {
const {type , payLoad} = action; 
//console.log(state);
switch(type)
    {
        case userActionTypes.SIGN_IN_START: 
            return {...state , isSigningIn:true}; 
        case userActionTypes.SIGN_IN_SUCCESS:
            return {...state , isSigningIn:false, currentUser:payLoad, isSignedIn:true};     
        case userActionTypes.SIGN_IN_FAILURE:
            return {...state, isSigningIn:false, signInError:payLoad};  
        case userActionTypes.SIGN_IN_ERROR_CLEAR:
            return {...state, signInError:null}    
        
        case userActionTypes.CHECK_SESSION_START: 
            return {...state, isCheckingSession:true};
        case userActionTypes.CHECK_SESSION_SUCCESS:
            return {...state, isCheckingSession:false, currentUser:payLoad};
        case userActionTypes.CHECK_SESSION_FAILURE:
            return {...state, isCheckingSession:false, sessionError:payLoad};   
        case userActionTypes.SET_UNSUBSCRIBER:
            return {...state, unsubscriberFR:payLoad};
            
        case userActionTypes.SIGN_OUT: 
             return {...state, currentUser:null};
          
        
        case userActionTypes.SIGN_UP_START: 
            return {...state, isSigningUp:true};
        case userActionTypes.SIGN_UP_SUCCESS:
            return {...state, isSigningUp:false,currentUser:payLoad};
        case userActionTypes.SIGN_UP_FAILURE:
            return {...state, isSigningUp:false, signUpError:payLoad};  
        case userActionTypes.SIGN_UP_ERROR_CLEAR:
            return {...state, signUpError:null};          

        default:
            return state; 
    }
}




export default userReducer; 