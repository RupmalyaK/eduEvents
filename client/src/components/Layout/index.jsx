import React, {useState, useEffect} from "react"; 
import {useSelector,useDispatch} from "react-redux";
import {selectIsBlurOn,selectIsSignOutBoxOpen} from "../../redux/system/system.selector";
import {setSignOutBoxClose,setBlurOff,setPageYTop,setSignOutBoxOpen} from "../../redux/system/system.action.js";
import {signOut} from "../../redux/user/user.action.js";
import {selectCurrentUser} from "../../redux/user/user.selector.js";
import {clearTasks} from "../../redux/events/events.actions.js";
import ConfirmationBox from "../ConfirmationPopup";
import Button from "../CustomButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import logo from "../../images/logo.png";
import {Container,Header,LogoContainer} from "./style.jsx";



const Layout = (props) => {
    const isBlurOn = useSelector(selectIsBlurOn);
    const isSignOutBoxOpen = useSelector(selectIsSignOutBoxOpen);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const scrollhandler = (e) => {
        dispatch(setPageYTop(window.pageYOffset))
       }
    useEffect(() => {
        window.addEventListener("scroll", scrollhandler);

        const unmountHandler = () => {
            window.removeEventListener("scroll",scrollhandler);
        }
        return unmountHandler;
    },[]);

    const handleSignOut = e => {
        dispatch(setSignOutBoxClose());
        dispatch(signOut());
        dispatch(clearTasks());
     
    };
    
    const handleSignOutCancel = e => {
        dispatch(setSignOutBoxClose());
    }; 
    
    const handleSignOutButtonClick = () => {
        dispatch(setSignOutBoxOpen());
    }

    const handleSignInClick = () => {
        history.push("/signinsignup");
    }

    const handleLogoClick = () => {
        history.push("/");
    }
    return(
    <Container isBlurOn={isBlurOn}>
       
       { isSignOutBoxOpen ? <ConfirmationBox text="Do you want to sign out?" confirmHandler={handleSignOut} cancelHandler={handleSignOutCancel} /> : "" }
        <Header>
        
           {currentUser ? 
                 <>
                 <Button onClick={handleSignOutButtonClick}>Sign Out</Button>
                <div className="info">
                    <LogoContainer onClick = {handleLogoClick}>
                         <img src={logo} alt="logo" /> 
                    </LogoContainer>
                    <span> <FontAwesomeIcon icon={faUser} /> {currentUser.displayName}</span>
                    <hr/>
                    <p>{currentUser.role ?  currentUser.role.toUpperCase() : ""}</p>
                </div>
                </>
                :<> <Button onClick={handleSignInClick}>Let's sign in or sign up</Button>
                     <LogoContainer onClick = {handleLogoClick}>
                         <img src={logo} alt="logo" /> 
                    </LogoContainer>   
                </>  
            }  
         </Header>   
        <div className="children-wrapper">
            {props.children}    
        </div>    
    </Container>);
    
}


export default Layout; 