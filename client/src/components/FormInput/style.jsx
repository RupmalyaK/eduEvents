import React from "react"; 
import styled , {css} from "styled-components"; 


const mainColor = "black"; 
const subColor = "grey"; 

const shrinkLabel = css`
top: -30px;
font-size: 12px;
color: mainColor;
`;

export const Container = styled.div`
position: ${props => props.isLabelPresent ? "relative" : "static"};
`;


export const InputLabel = styled.label`

    color: ${subColor};
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 300ms ease all;
     
    ${props => (props.value.length ? shrinkLabel : null)}
`;


export const Input = styled.input`
background: none;
background-color:#F0FFFF;
color: ${subColor};
font-size: 18px;
padding: 10px 10px 10px 5px;
display: block;
width: 100%;
border: none;
border-radius: 5%;
border-radius:5px;


    &:focus {
    outline: none;
    }

    &:focus ~ ${InputLabel} {
        ${shrinkLabel}
      }

      :-webkit-autofill ~ ${InputLabel}  {
        ${shrinkLabel}
      }
`;
