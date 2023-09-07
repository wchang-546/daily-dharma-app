import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function JournalApp() { 

    return ( 
        <Card className='center-box'> 
            <h3> What are you grateful for in this moment? </h3>
            <input type='text' placeholder='Enter response here'/>
            <Button variant='secondary' type='submit'> Submit </Button>
        </Card>
    )
}

export default JournalApp; 