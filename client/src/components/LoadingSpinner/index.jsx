
import React from "react"; 
import {SpinnerContainer,SpinnerOverlay} from "./style.jsx";



const LoadingSpinner = WrappedComponent => {
  const spinner = (
    (props) => {
      const {isLoading , ...otherProps} = props; 

      const displayWrappedComponent = () => {
        return (
          isLoading ? (
            <SpinnerContainer>
                  <SpinnerOverlay/>
            </SpinnerContainer>) 
          : <WrappedComponent {...otherProps} />
        );
      } 
     

            return(displayWrappedComponent());
        }
      );

      return spinner;
 }

export default LoadingSpinner; 

