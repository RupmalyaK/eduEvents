import styled from "styled-components";

export const Container = styled.div`
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
        font-size:1.2rem;
        text-align:center;
        display:flex;
        justify-content:center;
        align-items:center;
        height:34px;
        word-wrap: break-word
        
        
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
        word-wrap: break-word
    }
    `;