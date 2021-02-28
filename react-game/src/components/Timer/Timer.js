import React from 'react';
import './Timer.css';

const Timer = (props) => {
    return (
        <div>
            Time: 
            <span> {(props.time.h >= 10)? props.time.h : "0"+ props.time.h}</span>&nbsp;:&nbsp;
            <span>{(props.time.m >= 10)? props.time.m : "0"+ props.time.m}</span>&nbsp;:&nbsp;
            <span>{(props.time.s >= 10)? props.time.s : "0"+ props.time.s}</span>

        </div>
    )
}

export default Timer;