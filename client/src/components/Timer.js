import React, { useState, useRef, useEffect } from 'react'
import singingBowlSound from "./sounds/singing-bowl.mp3"

function Timer(){
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [playedSound, setPlayedSound] = useState(false);
    const audioRef = useRef(null)

    const ringSingingBowl = () => {
        if (audioRef.current) {
            audioRef.current.play(); 
        }
    }

    useEffect(() => {
      let interval;
  
      if (isActive) {
        interval = setInterval(() => {
          if (minutes === 0 && seconds === 0) {
            clearInterval(interval);
            setIsActive(false);
            ringSingingBowl();
          } else {
            if (seconds === 0) {
              setMinutes(minutes - 1);
              setSeconds(59);
            } else {
              setSeconds(seconds - 1);
            }
          }
        }, 1000);
        if (!playedSound){ 
            ringSingingBowl();
            setPlayedSound(true);
        }
      } else {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [isActive, minutes, seconds], []);
  
    const toggleTimer = () => {
      setIsActive(!isActive);
    };
  
    const increaseMinutes = () => {
      setMinutes(minutes + 1);
    };
  
    const decreaseMinutes = () => {
      if (minutes > 0) {
        setMinutes(minutes - 1);
      }
    };
  
    const resetTimer = () => {
      setIsActive(false);
      setMinutes(10);
      setSeconds(0);
      setPlayedSound(false);
    };
  
    return (
      <div className="countdown-timer">
        <div className="timer-display">
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
        <div className="timer-controls">
          <button className='green-button' onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
          <button className='green-button' onClick={increaseMinutes}>+1 Minute</button>
          <button className='green-button' onClick={decreaseMinutes}>-1 Minute</button>
          <button className='green-button' onClick={resetTimer}>Reset</button>
        </div>
        <audio ref={audioRef}>
            <source src={singingBowlSound} type='audio/mpeg' />
        </audio>
      </div>
    );
  }

  export default Timer; 