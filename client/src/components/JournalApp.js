import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function JournalApp() { 
    const [randomPrompt, setRandomPrompt] = useState([]); 
    const [entries, setEntries] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/career_prompts")
            .then((res) => res.json())
            .then((data) => {
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomPrompt(data[randomIndex]);
            })
    }, [])


    return ( 
        <div>
            <Card className='center-box' key={randomPrompt.id}> 
            <h2> {randomPrompt.prompt} </h2>
            <input type='text' placeholder='Enter response here'/>
            <Button variant='secondary' type='submit'> Submit </Button>
            </Card>
            <Card className='right-box'> 
                <h3> Past Entries - <br/> Search box </h3>
                <input placeholder='Search'/>
            </Card>
        </div>
    )
}

export default JournalApp; 