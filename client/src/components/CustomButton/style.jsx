import React from "react";
import styled , {css} from "styled-components"; 
import {motion} from "framer-motion";


export const invertedStyle = css`
background-color: white;
color: black;
border: 2px solid black;
margin:-2px;
box-sizing:border-box;

`;


export const googleSignInButtonStyle = css`
padding:0px 35px;
background-color:#4285f4;
color:white;
&:hover: {
  background-color:${props => props.theme.primaryBackgroundColor};
  border:none;
}
`;


export const Container = styled(motion.div)`


letter-spacing: 0.5px;
line-height: 50px;
padding: 0px 35px 0px 35px;
font-size: 15px;
background-color: black;
color: white;
text-transform: uppercase;
font-family: 'Open Sans Condensed';
border: none;
cursor: pointer;
display:flex;
justify-content:center;
align-items:center;
padding:0px;
&:hover {
  background-color: ${props => props.isInverted ?  props.theme.secondaryButtonColor: props.theme.alternateBackgroundColor};
  color: ${props => props.isInverted ? props.theme.primaryTextColor : props.theme.secondaryTextColor};
  border: ${props => props.isInverted ? "1px solid black":"white" };
}
${props => (props.isInverted ? invertedStyle : null)};
${props => (props.isGoogleSignIn ? googleSignInButtonStyle : null) };

`;




