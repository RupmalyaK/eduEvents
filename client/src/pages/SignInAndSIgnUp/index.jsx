import React from "react";
import styled from "styled-components";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

const Container = styled.div`
display:flex;
justify-content:space-around;
margin:50px 300px;
align-items:flex-start;
`;

const SignInSignUpPage = props => {

    return(
        <Container>
            <SignIn />
            <SignUp />
        </Container>
    );
}

export default SignInSignUpPage;