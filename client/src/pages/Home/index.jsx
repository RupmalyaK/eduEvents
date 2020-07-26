import React, {Component} from "react"; 
import Calendar from "../../components/Calendar";
import Events from "../../components/Events"; 
import {Container} from "./style.jsx";
import {clearSignUpError} from "../../redux/user/user.action";
import {connect} from "react-redux";


class Home extends Component {

 constructor(props){
  super(props);  
  const {clearSignUpError} = props;
  clearSignUpError();
 }

 render(){
   return(
    <Container style={{overflow:"hidden"}}>
      <div className="calendar-and-events">
        { <Events/>}
          <Calendar/>
      </div>
    </Container>
   );
 }
}

const mapDispatchToProps = dispatch => {
  return {clearSignUpError:() => {
    dispatch(clearSignUpError());
  }};
}


export default connect(null,mapDispatchToProps)(Home); 



