  
import React, {Component} from "react"; 
import {connect} from "react-redux"; 
import {selectSignUpError} from "../../redux/user/user.selector.js";
import {signUpAsync,signOut} from "../../redux/user/user.action.js";
import {clearSignUpError} from "../../redux/user/user.action";
import {withRouter} from "react-router-dom"; 
import Button from "../CustomButton"; 
import {Container,Title,CustomForm, CustomFormInput,CustomRadioButton,RadioButtons,Errors} from "./style.jsx";


class SignUp extends Component {
    state = {
        displayName:'',
        email:'',
        role:"Student",
        password:'',
        confirmPassword:'',
        confirmPasswordError:null,
    }

    roleChangeHandler = e => {
        this.setState({role:e.target.value});
    }

    handleSubmit = (e) => {
            const {displayName,email,role,password,confirmPassword} = this.state;
            const {clearSignUpError,signUp} = this.props;
            if (password !== confirmPassword)
            {
                this.setState({confirmPasswordError:"Confirm password didn't match"});
                return; 
            }
            clearSignUpError();
            signUp({displayName, email, password,role});
                this.setState({
                    email:'',password:'',confirmPassword:'',role:"Student"
                });
    }

    displayErrors = (errors) => {
        const ErrorsComponents = errors.map(
            error => {
                return (
                    <span className="error">{error}</span>
                );
            }
        );
       return <>
                {ErrorsComponents}    
             </>;     
    }

    render()
        {
            const {email,password,displayName,confirmPassword,role,confirmPasswordError} = this.state;
            const {displayNameErrors,passwordErrors,emailErrors} = this.props.errors;
    
            return(
                <Container>
                    <Title>I don't have an account</Title>
                    <span>let's create one</span>
                    <CustomForm>
                         {displayNameErrors.length !== 0 ? <span className="errors">{this.displayErrors(displayNameErrors)}</span>:<></>}
                        <div className="input">
                             
                             <CustomFormInput type="text" label="Display name" value={displayName} setState={value => this.setState({displayName:value})} required />
                        </div>
                        {emailErrors.length !== 0 ? <span className="errors">{this.displayErrors(emailErrors)}</span>:<></>} 
                        <div className="input">
                             
                              <CustomFormInput type="email" label="Email" value={email} setState={value => this.setState({email:value})} required />  
                        </div>
                        {passwordErrors.length !== 0 ? <span className="errors">{this.displayErrors(passwordErrors)}</span>:<></>} 
                        <div className="input">
                               <CustomFormInput type="password" label="Password" value={password} setState={value => this.setState({password:value})} required />
                        </div>
                        {confirmPasswordError ? <span className="error">{confirmPasswordError}</span>:<></>} 
                        <div className="input">
                               <CustomFormInput type="password" label="Confirm password" value={confirmPassword} setState={value => this.setState({confirmPassword:value})} required />
                        </div>
                       
                        
                        <div className="role">
                            <RadioButtons>
                                <div className="rolewrapper">
                                    <label>Student</label>
                                    <CustomRadioButton defaultChecked={role} type="radio" name="role" value="Student"  onChange={this.roleChangeHandler} required />
                                </div>
                                <div className="rolewrapper">
                                    <label>Teacher</label>
                                    <CustomRadioButton type="radio" name="role" value="Teacher" onChange={this.roleChangeHandler}  required />
                                </div>
                            </RadioButtons>
                        </div>
                        <Button type="submit" isInverted handleClick={this.handleSubmit}>Sign up</Button>
                    </CustomForm>
                </Container>
                );
        }

}

const mapStateToProps = state => {
    const signUpErrors = selectSignUpError(state);
    if(!signUpErrors)
    {
        return{
            errors:{},
        };
    }
    const errors = {
        emailErrors:[],
        passwordErrors:[],
        displayNameErrors:[]
    };

    signUpErrors.forEach( error =>{
        switch(error.param)
        {
            case "email":
                errors.emailErrors.push(error.msg);
                break;
            case "displayName":
                errors.displayNameErrors.push(error.msg);
                break;
            case "password":
                errors.passwordErrors.push(error.msg);          
        }
    })

    return {errors};
}

const mapDispatchToProps = dispatch => {
    return {
        signUp:({displayName,password, email,role}) => dispatch(signUpAsync({
            displayName, email, password,  role,
        })),
        clearSignUpError:() => dispatch(clearSignUpError())
    };
}
const SignUpWithRouter = withRouter(SignUp);
export default connect(mapStateToProps,mapDispatchToProps)(SignUpWithRouter)
