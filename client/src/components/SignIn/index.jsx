import React, {Component} from "react"; 
import {connect} from "react-redux"; 
import {signInUserWithEmailAndPasswordAsync, clearSignInError} from "../../redux/user/user.action";
import {selectSignInError} from "../../redux/user/user.selector.js";
import {withRouter} from "react-router-dom"; 
import FormInput from "../FormInput";
import Button from "../CustomButton";
import {Container,Title,Form,ButtonsContainer} from "./style.jsx";


class Signin extends Component {
    state = {
        email:"",
        password:""
    }

    handleSubmit = async (e) => { 
        e.preventDefault(); 
        const {clearSignInError,signInUserWithEmailAndPassword,history} = this.props; 
        const {email,password} = this.state;
        clearSignInError();
        signInUserWithEmailAndPassword(email , password);
        history.push('/');
        this.setState({email:'',password:''});
}
    render()
        {
            const {signInError} = this.props;
            const {email, password} = this.state;
            return(
                <Container>
                    <Title>I already have an account</Title>
                    <span>let's sign in with email and password</span>
                    {signInError ? <span className="error" style={{color:"orange"}}>Error: {signInError}</span>:<></>}
                    <Form>
                        <FormInput name="email" type="email" value={email} label="Email" setState={value => this.setState({email:value})} required className="mt-5"/>
                        <FormInput name="password" type="password" value={password} label="Password" setState={value => this.setState({password:value})} required className="mt-5 mb-5"/>
                        <ButtonsContainer>
                                <Button type="submit" handleClick={this.handleSubmit} isInverted style={{width:"100%"}}>Sign in</Button>
                        </ButtonsContainer>
                    </Form>
                </Container>
                );
        }

}

const mapStateToProps = state => {
    return {
        signInError:selectSignInError(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        signInUserWithEmailAndPassword:(email, password) => dispatch(signInUserWithEmailAndPasswordAsync(email, password)),
        clearSignInError:() => dispatch(clearSignInError())
    };
}

const SigninComponentWithRouter = withRouter(Signin)
export default connect(mapStateToProps,mapDispatchToProps)(SigninComponentWithRouter)





