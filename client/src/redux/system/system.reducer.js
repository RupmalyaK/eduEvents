import actionTypes from "./system.types.js"; 

const INITIAL_STATE = {
    isProfileMenuOpen:false,
    isBlurOn:false,
    isSignOutBoxOpen:false,
    isPageYTop:true,
};

const profileReducer = (state = INITIAL_STATE, action )  =>  {
    const {type,payLoad} = action; 

    switch(type)
        {
            case actionTypes.TOGGLE_PROFILE_MENU:
                        return {...state,isProfileMenuOpen:!state.isProfileMenuOpen};
            case actionTypes.SET_PROFILE_MENU_OPEN:
                         return {...state,isProfileMenuOpen:true};
            case actionTypes.SET_PROFILE_MENU_CLOSE:
                        return {...state,isProfileMenuOpen:false};
                        
            case actionTypes.TOGGLE_BLUR:
                         return {...state,isBlurOn:state.isBlurOn};
            case actionTypes.SET_BLUR_ON:
                         return {...state,isBlurOn:true};
            case actionTypes.SET_BLUR_OFF:
                         return {...state,isBlurOn:false};     
                         
            case actionTypes.SET_SIGN_OUT_BOX_OPEN:
                         return {...state,isSignOutBoxOpen:true};
            case actionTypes.SET_SIGN_OUT_BOX_CLOSE:
                        return {...state,isSignOutBoxOpen:false};
            case actionTypes.SET_PAGE_Y_TOP:
                        const considerTopValue = 10;
                        return {...state,isPageYTop:payLoad <= considerTopValue ? true : false};                     
            default: return state;
        }
}


export default profileReducer; 