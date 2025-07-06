import React, { useState } from 'react'
import Message from './Message';
import "./Chat.css"
import { useEffect, useRef } from 'react';
import { useLlama } from './hooks/useLlama';


export default function Chat() {
    const chatContRef = useRef(null);
    const [messages, askLlama, isLoading, clearHistory] = useLlama()


    useEffect(() => {
        if(chatContRef.current) {
            chatContRef.current.scrollTo({
                top: chatContRef.current.scrollHeight,
                behavior: "smooth"
            })
        }
    }, [messages])
    
    return ( 
        <div>
            <div className='chat-cont' ref={chatContRef}>
                {messages.map((el, index) => <Message key={index} msg={el}/>)}
                {isLoading ? <div className='loading' >Llama is thinking</div> : null}
            </div>
            

            <form onSubmit={(e) => {e.preventDefault(); const value = e.target.chatInput.value; askLlama({role: "user", content: value}); e.target.reset();}}>
                <textarea name="chatInput"type='text' placeholder='your message'></textarea>
                <button disabled={isLoading ? true : false} type='submit'>submit</button>
            </form>
            <button onClick={() => clearHistory()}>clear</button>
        </div>
    );
};