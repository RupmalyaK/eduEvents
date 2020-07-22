import styled from "styled-components";

export const Container = styled.div`

.cal-wrapper{
  width:600px;
  min-height:100%;

  .react-calendar__navigation {
   padding-bottom:150px;
   padding-top:50px;
   font-size:2rem;
   background:${props => props.theme.secondaryBackgroundColor} !important;
   border-left:none;
   outline:none;
  }
}

.react-calendar__tile--now{
 background:${props => props.theme.primaryBackgroundColor} !important;
}
.react-calendar__tile--active {
  background:${props => props.theme.secondaryBackgroundColor} !important;
}

.button{
  display:none;
}
`;