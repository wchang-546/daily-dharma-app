import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
 
function CalendarApp() {
    const [value, setValue] = useState(new Date());
 
    return (
        <div className='center-box'>
            <Calendar
                onChange={setValue}
                value={value}
            />
        </div>
    );
}

export default CalendarApp;