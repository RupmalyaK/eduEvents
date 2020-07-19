import React from "react"; 
import {Container} from "./style.jsx"

const Button = (props) => {
const {handleClick , children,isGoogleSignIn,isInverted,animate,initial,variants, ...otherProps} = props;
return(
<Container animate={animate} initial={initial} onClick = {handleClick} {...otherProps} isGoogleSignIn={isGoogleSignIn} isInverted={isInverted}>
    {children}
</Container>
);
}



export default Button; 