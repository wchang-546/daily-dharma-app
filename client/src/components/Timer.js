import React, { useState, useRef, useEffect } from 'react'
 
function Timer(){
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
  
    useEffect(() => {
      let interval;
  
      if (isActive) {
        interval = setInterval(() => {
          if (minutes === 0 && seconds === 0) {
            clearInterval(interval);
            setIsActive(false);
          } else {
            if (seconds === 0) {
              setMinutes(minutes - 1);
              setSeconds(59);
            } else {
              setSeconds(seconds - 1);
            }
          }
        }, 1000);
      } else {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [isActive, minutes, seconds]);
  
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
      setMinutes(5);
      setSeconds(0);
    };
  
    return (
      <div className="countdown-timer">
        <div className="timer-display">
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
        <div className="timer-controls">
          <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
          <button onClick={increaseMinutes}>+1 Minute</button>
          <button onClick={decreaseMinutes}>-1 Minute</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    );
  }
 
export default Timer;