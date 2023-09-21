import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Timer from './Timer'

function MeditationApp(){

    return (
        <Card className='center-box'> 
            <h1> Meditation </h1>
            <Timer />
        </Card>
    )
}

export default MeditationApp;