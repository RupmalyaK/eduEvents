import actionTypes from "./system.types.js";

export const toggleProfileMenu = () => {
    return {type:actionTypes.TOGGLE_PROFILE_MENU,payLoad:null}; 
}

export const setProfileMenuOpen = () => {
    return {type:actionTypes.SET_PROFILE_MENU_OPEN};
}

export const setProfileMenuClose = () => {
    return {type:actionTypes.SET_PROFILE_MENU_CLOSE};
}

export const toggleBlur = () => {
    return {type:actionTypes.TOGGLE_BLUR};
}

export const setBlurOn = () => {
    return {type:actionTypes.SET_BLUR_ON};
}

export const setBlurOff = () => {
    return {type:actionTypes.SET_BLUR_OFF};
}

export const setSignOutBoxOpen = () => {
    return {type:actionTypes.SET_SIGN_OUT_BOX_OPEN};
}

export const setSignOutBoxClose = () => {
    return {type:actionTypes.SET_SIGN_OUT_BOX_CLOSE};
}

export const setPageYTop = (pageYOffset) => {
    
    return{type:actionTypes.SET_PAGE_Y_TOP,payLoad:pageYOffset};
}