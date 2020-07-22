import styled from "styled-components";
import FormInput from "../FormInput";

export const Container = styled.div`
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

export const Header = styled.div`
width:300px;
height:100vh;
background:${props => props.theme.primaryTextColor};
position:fixed;
left:0;


.info{
    font-size:1rem;
    color:${props => props.theme.alternateTextColor};
    padding-left:10px;
    margin-top:200px;
}
`;

export const LogoContainer = styled.div`
height:120px;
width:120px;
position:absolute;
bottom:0;
display:flex;
cursor:pointer;
bottom:100px;
margin:50px;
justify-content:center;
align-items:center;
z-index:100;
`;