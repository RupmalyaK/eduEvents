import React from "react";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import {Container} from "./style.jsx";



const SignInSignUpPage = props => {
    return(
        <Container>
            <SignIn />
            <SignUp />
        </Container>
    );
}

export default SignInSignUpPage;