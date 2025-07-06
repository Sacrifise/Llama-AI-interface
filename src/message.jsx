import React from 'react'
import "./message.css"

import Markdown from 'react-markdown';

export default function Message(props) {
    
    return ( 
        <div className={`${props.msg.role === "user" ? "your-message": "message"} ${props.msg.role === "system" ? "none" : ""}`}>{props.msg.role === "assistant"  ? <Markdown >{props.msg.content}</Markdown> : props.msg.content}</div>
    );
};