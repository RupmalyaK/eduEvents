import React, {useState, useEffect} from "react"; 
import {useSelector} from "react-redux";
import {signInWithGoogle} from "../../firebase/firebase.util.js"; 
import { useDispatch} from "react-redux"; 
import {signInUserWithEmailAndPasswordAsync, clearSignInError} from "../../redux/user/user.action";
import {selectSignInError} from "../../redux/user/user.selector.js";
import {useHistory} from "react-router-dom"; 
import FormInput from "../FormInput";
import Button from "../CustomButton";
import {Container,Title,Form,ButtonsContainer} from "./style.jsx";






const SignIn = (props) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const signInError = useSelector(selectSignInError);
const dispatch = useDispatch();  
const history = useHistory();




const handleSubmit = async (e) => { 
        e.preventDefault(); 
        dispatch(signInUserWithEmailAndPasswordAsync(email , password));
        history.push('/');
        setEmail('');
        setPassword(''); 
}

useEffect(() => {
        if(signInError)
            {
                alert(signInError);
            }
        dispatch(clearSignInError());
} , []);



return(
<Container>
    <Title>I already have an account</Title>
    <span>let's sign in with email and password</span>
    <Form>
        <FormInput name="email" type="email" value={email} label="Email" setState={setEmail} required className="mt-5"/>
        <FormInput name="password" type="password" value={password} label="Password" setState={setPassword} required className="mt-5 mb-5"/>
        <ButtonsContainer>
                <Button type="submit" handleClick={handleSubmit} isInverted style={{width:"100%"}}>Sign in</Button>
        </ButtonsContainer>
    </Form>
</Container>
);
}



export default SignIn; 



/**
 * Email-id
 * password
 * Role
 * DisplayName
 */
