import React from 'react';
import Card from 'react-bootstrap/Card';

export default function JournalEntry({ entry }){ 

    return (
        <Card className='green-box'> 
            <h1 className='headline'> {entry.journal_prompt.prompt} </h1>
            <h2 className='journal-font'> {entry.journal_entry} </h2>
        </Card>
    )
}