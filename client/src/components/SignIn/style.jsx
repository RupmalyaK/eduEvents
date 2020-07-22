import React from "react"; 
import styled from "styled-components"; 


export const Container = styled.div`
width:500px;
display:flex;
flex-direction:column;
margin-right:50px;
border:2px solid ${props => props.theme.secondaryBackgroundColor};
padding:20px;
z-index:25;
color:${props => props.theme.primaryTextColor} !important;
`;


export const Title = styled.h2`
margin: 10px 0px;
color:${props => props.theme.secondaryBackgroundColor} !important;
`;

export const Form = styled.form`
`;

export const ButtonsContainer = styled.div`
display:flex;
justify-content:space-between;
`;
