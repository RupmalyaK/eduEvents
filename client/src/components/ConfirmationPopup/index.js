import React, {useEffect,Component} from "react";
import styled from "styled-components";
import {useDispatch,connect} from "react-redux";
import {setBlurOn,setBlurOff} from "../../redux/system/system.action.js"
import Button from "../CustomButton";

const Container = styled.div`
    background:#f8f9fa;
    display:block;
    position:fixed;
    top:50%;
    left:50%;
    width:500px;
    height:102px;
    border-radius:2%;
    margin-left:-250px;
    margin-top:-100px;
   // background:coral;
    z-index:100
    text-align:center;
    padding-top:5px;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    overflow:hidden;
    .text{
        font-size:1.2rem;
       //background:yellow;
     
    }
    .buttons{
        flex:1;
        width:100%;
        margin-top:5%;
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        align-items:flex-end;
        z-index:22;
        
    }
`;

const CustomButton = styled(Button)`
width:90%;
`;

const ConfirmButton = styled(CustomButton)`
background:${props => props.theme.secondaryBackgroundColor};
`;

const CancelButton = styled(CustomButton)`
background:${props => props.theme.alternateBackgroundColor};
`;


class ConfirmationPopup extends Component
    {
        constructor(props)
            {
                super(props);
                props.setBlurOn();
            }

           confirmHandlerWrapper = (e) => {
                this.props.setBlurOff();
                this.props.confirmHandler(e);
            }
        
            cancelHandlerWrapper = (e) => {
                this.props.setBlurOff();
                this.props.cancelHandler(e);
            }
        
            render()
                {
                    const {text} = this.props;
                    
                    return(
                    <Container>
                        <div>
                           <div className="text">{text}</div>
                            <div className="buttons">
                                <ConfirmButton onClick={this.confirmHandlerWrapper}>Yes</ConfirmButton>
                                <CancelButton onClick={this.cancelHandlerWrapper}>No</CancelButton >                      
                            </div>
                        </div>    
                    </Container>
                    );      
                }
    }

    const mapDispatchToProps = dispatch => {
        return ({
            setBlurOn:() => dispatch(setBlurOn()),
            setBlurOff:() => dispatch(setBlurOff()),
        });
    }
export default connect(null,mapDispatchToProps)(ConfirmationPopup);

