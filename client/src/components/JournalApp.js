import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import JournalEntry from './JournalEntry';

export default function JournalApp({ user }) { 
    const [randomPrompt, setRandomPrompt] = useState([]); 
    const [entries, setEntries] = useState([]);
    const [searchInput, setSearchInput] = useState("");

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
            <input type='text' placeholder='Enter response here'/>
            <Button variant='secondary' type='submit'> Submit </Button>
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
