import styled from "styled-components";
import FormInput from "../FormInput";
import {motion} from "framer-motion";

export const Container = styled.div`
position:relative;
min-height:100%;
width:700px;
overflow:hidden;
display:flex;
flex-direction:column;
background:${props => props.theme.secondaryBackgroundColor};

.events-header{
    font-size:2rem;
    display:flex;
    justify-content:center;
    align-items:center;
    height:20%;
    z-index:10;
    background:${props => props.theme.secondaryBackgroundColor};
    color:${props => props.theme.secondaryTextColor};
    .date{
        margin-left:20px;
        color:${props => props.theme.primaryTextColor} ;
    }
    .fa-plus{
        position:absolute;
        top:5%;
        right:2%;
    }
    
}
.content{
    overflow:auto;
    font-weight:100;
    height:80%;
    z-index:5;
    background:${props => props.theme.primaryBackgroundColor};
    display:flex;
    font-size:${props => props.isNoTask ? "2.5rem" : "1.2rem"};
    justify-content:${props => props.isNoTask ? "center" : "flex-start"};
    align-items:${props => props.isNoTask ? "center":"flex-start"} ;
    flex-direction:column;
}

.no-task{
    display:flex;
    flex-direction:column;
    align-items:center;

    .text{
        margin-bottom:25px;
    }
}

.task{
    width:100%;
    color:${props => props.theme.primaryTextColor};
    display:flex;
    justify-content:flex-start;
    margin-bottom:20px;
    height:200px;
    flex-direction:column;
    position:relative;
    border:1px solid ${props => props.theme.primaryBorder};
    h4{
        text-align:center;
        display:flex;
        justify-content:center;
        align-items:center;
        height:34px;
        padding:10px;
        
    }
    .task-footer{
        position:absolute;
        bottom:0;
        right:5%;

        span{
            margin-left:25px;
        }
    }
    p{
        margin:5px 20px 10px 20px;
        padding:5px;
        font-weight:200;
        height:55%;
        background:white;
    }
}
`;

export const EventForm = styled(motion.div)`
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

export const CustomPlus = styled.div`
    font-size:4rem;
    background:${props => props.theme.primaryButtonColor};
    padding:10px;
    border-radius:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    width:50px;
    height:50px;
    cursor:pointer;
    color:${props => props.theme.secondaryButtonColor};
    opacity:80%;
    &:hover{
        opacity:100%;
    }
`
export const CustomFormInput = styled(FormInput)`
min-width:100%;
margin-bottom:25px;
`;
