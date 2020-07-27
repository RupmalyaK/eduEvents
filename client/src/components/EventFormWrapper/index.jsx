import React from "react";
import {useAnimation} from "framer-motion";
import EventForm from "../EventForm";


const EventFormWrapper = props => {
        const eventFormControl = useAnimation();
       
        return(
            <>
                <EventForm {...props} eventFormControl={eventFormControl} />
            </>
        );
}

export default EventFormWrapper;
