import React, { Component} from 'react';
import Cal from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {fetchEventsAsync} from "../../redux/events/events.actions.js";
import {useDispatch,connect} from "react-redux";
import {Container} from "./style.jsx";

class Calendar extends Component {
  state = {
    date:new Date(Date.now()),
  }

  constructor(props){
    super(props);
    const {fetchEvents} = props;
    fetchEvents(this.state.date);
  }

  handleChange = (date,fetchEvents) => {
    this.setState({date});
    fetchEvents(date);
  }

  render()
    {
      const {fetchEvents} = this.props;
      return(
      <Container>
        <Cal
          onChange={date => this.handleChange(date,fetchEvents)}
          value={this.date}
          className="cal-wrapper"
        />
      </Container>
      );
    }

}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: date => {
      dispatch(fetchEventsAsync(date))
    }
  };
}


export default connect(null,mapDispatchToProps)(Calendar);