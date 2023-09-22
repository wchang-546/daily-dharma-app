import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import JournalEntry from './JournalEntry';

export default function JournalApp({ user }) { 
    const [randomPrompt, setRandomPrompt] = useState([]); 
    const [entries, setEntries] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [journalEntry, setJournalEntry] = useState('')
    useEffect(() => {
        fetch('/prompts')
            .then((res) => res.json())
            .then((data) => {
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomPrompt(data[randomIndex]);
            })
        fetch('/journal_entries')
        .then((res) => res.json())
        .then((data) => {
            setEntries(data)
        })
    }, [])

    const handleJournalEntryChange = (e) => {
        setJournalEntry(e.target.value);
    };

    const handleSubmitJournal = async (e) => {
        e.preventDefault();

        const response = await fetch('/journal_entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                journal_entry: journalEntry, // Assuming journalEntry is the text you want to submit
                prompt_id: randomPrompt.id, // Assuming you want to associate it with the current prompt
            }),
        });
    
        if (response.ok) {
            // If the request is successful, add the new entry to the state
            const newEntry = await response.json();
            setEntries([...entries, newEntry]);
            setJournalEntry(''); // Clear the journal entry input
        } else {
            // Handle the error here, e.g., display an error message to the user
            console.error('Failed to submit journal entry');
        }
    };
    

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }

    const filteredEntries = entries.filter((entry) => {
        return entry.journal_entry 
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
    
    const entriesToDisplay = filteredEntries.map((entry) => {
            return (<JournalEntry key={entry.id} entry={entry}/>)
    })

    return ( 
        <div>
            <Card className='green-center-box' key={randomPrompt.id}> 
            <h2 className='headline'> {randomPrompt.prompt} </h2>
            <input type='text' placeholder='Enter response here' onChange={handleJournalEntryChange}/>
            <Button variant='secondary' type='submit' onClick={handleSubmitJournal}> Submit </Button>
            </Card>
            {user ? 
             <Card className='green-right-box'> 
                <h3 className='headline'> Past Entries </h3>
                <input placeholder='Search' onChange={handleSearch}/>
                {entriesToDisplay}
            </Card> : null}
   
        </div>
    )
}
