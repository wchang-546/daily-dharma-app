import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Timer from './Timer'

export default function MeditationApp(){

    return (
        <Card className='green-center-box'> 
            <h1 className='headline'> Meditation Center </h1>
            <Timer />
        </Card>
    )
}
