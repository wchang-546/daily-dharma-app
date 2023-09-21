import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
 
function CalendarApp() {
    const [value, setValue] = useState(new Date());
    
    const selectDate = (e) => {
        setValue(e)
        console.log(e) 
    }

    

    return (
        <div className='center-box'>
            <Calendar
                onChange={selectDate}
                value={value}
            />
        </div>
    );
}

export default CalendarApp;