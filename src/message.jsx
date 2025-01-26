import React from 'react'
import "./message.css"


export default function Message(props) {
    console.log(props)
    return ( 
        <div className='your-message'>{props.text}</div>
    );
};