import {createSelector} from "reselect";

export const selectSystem = state => state.system;

export const selectIsProfileMenuOpen = createSelector(selectSystem, system => system.isProfileMenuOpen);

export const selectIsBlurOn = createSelector(selectSystem, system => system.isBlurOn);

export const selectIsSignOutBoxOpen = createSelector(selectSystem, system => system.isSignOutBoxOpen);

export const selectIsPageYtop = createSelector(selectSystem, system => system.isPageYTop); 

