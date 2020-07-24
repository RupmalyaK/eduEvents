import React, {useEffect} from 'react';
import {useSelector , useDispatch} from "react-redux"; 
import {Route , Switch , Redirect} from "react-router-dom"; 
import {useHistory} from "react-router-dom";
import {selectCurrentUser} from "./redux/user/user.selector.js";
import {checkSessionAsync, signOutAsync} from "./redux/user/user.action.js";
import {selectIsSigningIn, selectIsCheckingSession, selectSignInError, selectSignUpError, selectIsSigningUp} from "./redux/user/user.selector.js";
import Layout from "./components/Layout"; 
import LoadingSpinner from "./components/LoadingSpinner";
import Homepage from "./pages/Home"; 
import {GlobalStyle,theme} from "./components/GlobalStyle";
import {ThemeProvider} from "styled-components";
import SignInSignUpPage from "./pages/SignInAndSIgnUp";
import { selectIsFetchingEvents } from "./redux/events/events.selector.js";

const LayoutWithLoadingSpinner = LoadingSpinner(Layout);

const App = () => {
  const isCheckingSession = useSelector(selectIsCheckingSession);
  const currentUser = useSelector(selectCurrentUser);
  const isSigningIn = useSelector(selectIsSigningIn);
  const isSigningUp = useSelector(selectIsSigningUp);
  const isFetchingEvents = useSelector(selectIsFetchingEvents);
  const signInError = useSelector(selectSignInError);
  const signUpError = useSelector(selectSignUpError);
  const history = useHistory();
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    const handleUnmount = () => console.log("App unmounted"); 
    return handleUnmount; 
  },[]);


  useEffect(() => {
    if (signInError)
      {
        history.push("/signinsignup");
      }  
  }, [signInError]);



    return (
      <div>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <LayoutWithLoadingSpinner isLoading={isSigningIn ||/* isCheckingSession || **/isSigningUp || isFetchingEvents}>
                <Switch>
                    <Route path='/' exact component={Homepage} />
                    <Route path="/signinsignup" exact render = {
                      () => (
                        currentUser ? <Redirect to='/'/> : <SignInSignUpPage/>)
                        }  /> 

              
                </Switch>
          </LayoutWithLoadingSpinner>
       </ThemeProvider>
      </div>
  );
}


export default App;
