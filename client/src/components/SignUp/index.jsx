  
import React, {useState,useEffect} from "react"; 
import {useSelector , useDispatch} from "react-redux"; 
import {selectSignUpError} from "../../redux/user/user.selector.js";
import {signUpAsync,signOut} from "../../redux/user/user.action.js";
import {clearSignUpError} from "../../redux/user/user.action";
import {useHistory} from "react-router-dom"; 
import Button from "../CustomButton"; 
import {Container,Title,CustomForm, CustomFormInput,CustomRadioButton,RadioButtons} from "./style.jsx";



const SignUp = (props) => {

const [displayName , setDisplayName] = useState('');
const [email , setEmail] = useState('');
const [role,setRole] = useState("Student");
const [password , setPassword] = useState('');
const [confirmPassword , setConfirmPassword] = useState('');
const signUpError = useSelector(selectSignUpError); 
const history = useHistory();
const dispatch = useDispatch();

const handleSubmit = async (e) => {
    if (password !== confirmPassword)
    {
        alert("Password and Confirm password didn't match");
        return; 
    }
       dispatch(signUpAsync({
            displayName, email, password, confirmPassword, role,
        }));
        history.push('/');
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
}

const roleChangeHandler = e => {
    setRole(e.target.value);
}

useEffect(() => {
    dispatch(signOut());
if (signUpError)
    {
        alert(signUpError); 
        dispatch(clearSignUpError());   
    }    
},[signUpError]);
return(
<Container>
    <Title>I don't have an account</Title>
    <span>let's create one</span>
    <CustomForm>
        <div className="input">
             <CustomFormInput type="text" label="Display name" value={displayName} setState={setDisplayName} required />
        </div>
        <div className="input">
              <CustomFormInput type="email" label="Email" value={email} setState={setEmail} required />  
        </div>
        <div className="input">
               <CustomFormInput type="password" label="Password" value={password} setState={setPassword} required />
        </div>
        <div className="input">
               <CustomFormInput type="password" label="Confirm password" value={confirmPassword} setState={setConfirmPassword} required />
        </div>
       
        
        <div className="role">
            <RadioButtons>
                <div className="rolewrapper">
                    <label>Student</label>
                    <CustomRadioButton defaultChecked={role} type="radio" name="role" value="Student"  onChange={roleChangeHandler} required />
                </div>
                <div className="rolewrapper">
                    <label>Teacher</label>
                    <CustomRadioButton type="radio" name="role" value="Teacher" onChange={roleChangeHandler}  required />
                </div>
            </RadioButtons>
        </div>
        <Button type="submit" isInverted handleClick={handleSubmit}>Sign up</Button>
    </CustomForm>
</Container>
);
}

export default SignUp; 