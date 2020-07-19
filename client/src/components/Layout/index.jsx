import React, {useState, useEffect} from "react"; 
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import {selectIsBlurOn,selectIsSignOutBoxOpen} from "../../redux/system/system.selector";
import {setSignOutBoxClose,setBlurOff,setPageYTop,setSignOutBoxOpen} from "../../redux/system/system.action.js";
import {signOutAsync,} from "../../redux/user/user.action.js";
import {selectCurrentUser} from "../../redux/user/user.selector.js";
import ConfirmationBox from "../ConfirmationPopup";
import FormInput from "../FormInput";
import Button from "../CustomButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import logo from "../../images/logo.png";

const Container = styled.div`
height:${props => props.isBlurOn?"100vh":"auto"};
width:${props => props.isBlurOn?"100vw":"auto"};

justify-content:center;

overflow:hidden;
&:after{
    content:"222";
    position:fixed;
    top:0;
    left:0;
    height:100%;
    background:black;
    width:100vw;
    z-index:50;
    display:${props => props.isBlurOn?"block":"none"}
    opacity:90%;
}
`;

const Header = styled.div`
width:300px;
height:100vh;
background:${props => props.theme.alternateBackgroundColor};
position:fixed;
left:0;


.info{
    font-size:1rem;
    color:${props => props.theme.secondaryTextColor};
    padding-left:10px;
    margin-top:200px;
}
`;

const LogoContainer = styled.div`
height:120px;
width:120px;
position:absolute;
bottom:0;
display:flex;

bottom:100px;
margin:50px;
justify-content:center;
align-items:center;
z-index:100;
`;

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
        dispatch(signOutAsync());
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
    return(
    <Container isBlurOn={isBlurOn}>
       
       { isSignOutBoxOpen ? <ConfirmationBox text="Do you want to sign out?" confirmHandler={handleSignOut} cancelHandler={handleSignOutCancel} /> : "" }
        <Header>
        
           {currentUser ? 
                 <>
                 <Button onClick={handleSignOutButtonClick}>Sign Out</Button>
                <div className="info">
                    <LogoContainer>
                         <img src={logo} alt="logo" /> 
                    </LogoContainer>
                    <span> <FontAwesomeIcon icon={faUser} /> {currentUser.displayName}</span>
                    <hr/>
                    <p>{currentUser.role ?  currentUser.role.toUpperCase() : ""}</p>
                </div>
                </>
                :<> <Button onClick={handleSignInClick}>Let's sign in or sign up</Button>
                     <LogoContainer>
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