import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function JournalApp({ user }) { 
    const [randomPrompt, setRandomPrompt] = useState([]); 
    const [entries, setEntries] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/prompts")
            .then((res) => res.json())
            .then((data) => {
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomPrompt(data[randomIndex]);
            })
    }, [])

    //Write code to set entries state to entries that match the session user_id 

    const handleSearch = (e) => {
        console.log(e.target.value);
        setSearchInput(e.target.value)
    }

    const filteredEntries = entries.filter((entry) => {
        return entry.name
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
    
    //Fix code here to display user_id
    const entriesToDisplay = filteredEntries.map((entry) => {
        if (entry.id === 'user_id') {
            return (<div>
                        <h1> {entry.prompt} </h1>
                        <h2> {entry.journal_entry} </h2>
                    </div> )
        }
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
            </Card> : null}
   
        </div>
    )
}
