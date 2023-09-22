import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from 'react-bootstrap/Button';
import CalendarEntry from './CalendarEntry';
import Card from 'react-bootstrap/Card';
import CalendarChart from './CalendarChart';
 
export default function CalendarApp({ user }) {
    const [date, setDate] = useState(new Date());
    const [selectedMood, setSelectedMood] = useState('Stoked');
    const [entries, setEntries] = useState([])
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
      setSearchInput(e.target.value)
    }

    useEffect(() => {
        fetch('/calendar_entries')
        .then((res) => res.json())
        .then((data) => {
            setEntries(data)
        })
    }, [])

    const selectDate = (e) => {
        setDate(e)
    }

    const handleMoodChange = (e) => {
        setSelectedMood(e.target.value);
    }

    const filteredEntries = entries.filter((entry) => {
        return entry.created_date.includes(searchInput);
      });
    
    const entriesToDisplay = filteredEntries.map((entry) => {
            return (<CalendarEntry key={entry.id} entry={entry}/>)
    }) 

    const handleSubmitCalendar = async (e) => {
        e.preventDefault();
        const response = await fetch('/calendar_entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                created_date: date,
                mood: selectedMood,
            }),
        });

        if (response.ok) {
            const newEntry = await response.json();
            setEntries([...entries, newEntry]);
        } else {
            console.error('Failed to submit calendar entry.')
        }
    }

    //Stretch goal: Calendar scatterplot. Work on it later. 
    //<CalendarChart entries={entries}/>

    
    return (
        <div>
            <div className='green-center-box'>
                <Calendar
                    onChange={selectDate}
                    value={date}
                />    
            </div>
            <div className='green-left-box'>
                <h1 className='headline'> Date: {date.toLocaleDateString()}</h1>
                <select id='mood' onChange={handleMoodChange} value={selectedMood}> 
                    <option> Stoked </option>
                    <option> Good </option>
                    <option> Okay </option>
                    <option> Bad </option>
                    <option> Terrible </option>
                </select>
                <Button className='green-button' onClick={handleSubmitCalendar}> Enter Mood </Button>
            </div>
            {user ? 
            <div>
             <Card className='green-right-box'> 
                <h3 className='headline'> Past Entries </h3>
                <input placeholder='Search' onChange={handleSearch}/>
                {entriesToDisplay}
            </Card> 
             </div> : null}
        </div>
    );
}
