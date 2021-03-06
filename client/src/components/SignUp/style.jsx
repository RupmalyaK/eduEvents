import React from "react";
import styled from "styled-components";
import FormInput from "../FormInput";

export const Container = styled.div`
display: flex;
flex-direction: column;
width: 500px;
border:2px solid ${props => props.theme.primaryBackgroundColor};
padding:25px;
color:${props => props.theme.primaryTextColor} !important;
justify-content:center;

`; 

export const Title = styled.h2`
margin: 10px 0;
color:${props => props.theme.primaryBackgroundColor};
`;


export const CustomForm = styled.form`
display:flex;
flex-direction:column;
margin-top:50px;
.input{
    height:100px;
}

.role{
    margin-bottom:24px;
    margin-top:20px;
    background:#F0FFFF;
    border-radius:5%;
    .rolewrapper{
       // display:flex;
        padding:10px;
        width:100%;
        justify-content:space-around;
        align-items:center;
        label{
            vertical-align:middle;
            font-size:1.2rem;
        }

    }
   
}
.error{
    color:orange;
    transform:translateY(-200);
    margin-bottom:40px;
}
`;

export const CustomFormInput = styled(FormInput)`
margin:0px;

`;

export const RadioButtons = styled.div`
display:flex;
align-items:center;
`;

export const CustomRadioButton = styled.input`
margin:0px;
width:23px;
height:20px;
vertical-align:middle;
margin-left:10px;
flex-direction:column;

`;



