import React, {Component} from "react"; 
import {connect} from "react-redux";
import {selectIsBlurOn,selectIsSignOutBoxOpen} from "../../redux/system/system.selector";
import {setSignOutBoxClose,setBlurOff,setPageYTop,setSignOutBoxOpen} from "../../redux/system/system.action.js";
import {signOut} from "../../redux/user/user.action.js";
import {selectCurrentUser} from "../../redux/user/user.selector.js";
import {clearTasks} from "../../redux/events/events.actions.js";
import ConfirmationBox from "../ConfirmationPopup";
import Button from "../CustomButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from "react-router-dom";
import logo from "../../images/logo.png";
import {Container,Header,LogoContainer} from "./style.jsx";


class Layout extends Component {
constructor(props)
    {
        super(props);
        window.addEventListener("scroll", this.scrollhandler);
    }

    scrollhandler = (e) => {
        setPageYTop(window.pageYOffset);
       }

  
    handleSignOut = e => {
        const {setSignOutBoxClose,signOut,clearTasks} = this.props;
        setSignOutBoxClose();
        signOut();
        clearTasks();
    };
    
    handleSignOutCancel = e => {
        this.props.setSignOutBoxClose();
    }; 
    
    handleSignOutButtonClick = () => {
        this.props.setSignOutBoxOpen();
    }

    handleSignInClick = () => {
     this.props.history.push("/signinsignup");
    }

    handleLogoClick = () => {
       this.props.history.push("/");
    }   

    componentWillUnmount()
        {
          window.removeEventListener("scroll",this.scrollhandler);
        }
        
        
        render() 
            {
                const {isBlurOn,isSignOutBoxOpen,currentUser,children} = this.props;
                return(
                    <Container isBlurOn={isBlurOn}>
                        
                        { isSignOutBoxOpen ? <ConfirmationBox text="Do you want to sign out?" confirmHandler={this.handleSignOut} cancelHandler={this.handleSignOutCancel} /> : "" }
                        <Header>
                        
                            {currentUser ? 
                                    <>
                                    <Button onClick={this.handleSignOutButtonClick}>Sign Out</Button>
                                <div className="info">
                                    <LogoContainer onClick = {this.handleLogoClick}>
                                            <img src={logo} alt="logo" /> 
                                    </LogoContainer>
                                    <span> <FontAwesomeIcon icon={faUser} /> {currentUser.displayName}</span>
                                    <hr/>
                                    <p>{currentUser.role ?  currentUser.role.toUpperCase() : ""}</p>
                                </div>
                                </>
                                :<> <Button onClick={this.handleSignInClick}>Let's sign in or sign up</Button>
                                        <LogoContainer onClick = {this.handleLogoClick}>
                                            <img src={logo} alt="logo" /> 
                                    </LogoContainer>   
                                </>  
                            }  
                            </Header>   
                        <div className="children-wrapper">
                            {children}    
                        </div>    
                    </Container>);
                    
            }
}

const mapStateToProps = state => {
    return {
        isBlurOn:selectIsBlurOn(state),
        isSignOutBoxOpen:selectIsSignOutBoxOpen(state),
        currentUser:selectCurrentUser(state),
    }
}


const mapDispatchToState = dispatch => {
    return {
        setSignOutBoxOpen:() => dispatch(setSignOutBoxOpen()),
        setSignOutBoxClose:() => dispatch(setSignOutBoxClose()),
        setPageYTop:yOffset => dispatch(setPageYTop(yOffset)),
        setBlurOff:() => dispatch(setBlurOff()),
        signOut:() => dispatch(signOut()),
        clearTasks:() => dispatch(clearTasks())
    }

}

const LayoutWithRouter = withRouter(Layout);
export default connect(mapStateToProps,mapDispatchToState)(LayoutWithRouter);