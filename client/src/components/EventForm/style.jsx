
import styled from "styled-components";
import FormInput from "../FormInput";
import {motion} from "framer-motion";

export const Container = styled(motion.div)`
width:100%;
height:90%;
background:${props => props.theme.secondaryBackgroundColor};
position:absolute;
z-index:90;
display:flex;
flex-direction:column;
padding:20px 20px;


.fa-caret-up{
    font-size:5rem;
    width:75px;
    height:75px;
    padding:0;
   position:absolute;
   top:-5%;
   left:45%;
   color:${props => props.theme.secondaryBackgroundColor};
}

h4{
    align-self:center;
    margin-bottom:10%;
    color:${props => props.theme.primaryTextColor}
   
}

`;

export const CustomFormInput = styled(FormInput)`
min-width:100%;
margin-bottom:25px;
`;

export const Errors = styled.div`
display:flex;
flex-direction:column;
margin-bottom:23px;
color:orange;
margin-left:10px;
.heading{
   font-size:1.2rem;
   color:red;
}
.error{
    margin-bottom:5px;
}
`;
