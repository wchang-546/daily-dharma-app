import React from 'react';
import Card from 'react-bootstrap/Card';

export default function CalendarEntry({ entry }){
    const createdDate = new Date(entry.created_date);

    const year = createdDate.getFullYear();
    const month = (createdDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are zero-indexed
    const day = createdDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return (
        <Card className='green-box'> 
            <h1 className='headline'> {formattedDate} </h1>
            <h2 className='journal-font'> {entry.mood} </h2>
        </Card>
    )
}