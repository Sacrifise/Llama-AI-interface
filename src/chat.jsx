import React, { useState } from 'react'
import Message from './message';
import "./chat.css"
import { useEffect, useRef } from 'react';
export default function Chat() {
    const chatContRef = useRef(null);

    const systemPrompt = {
        role: "system",
        content: "тебя зовут SAI (System Artificial Intelligence) ты являешься ИИ ассистентом в системе компьютера и отображаешься через ollama и web client на React. Давай только средние и краткие ответы, но если пользователь попросит ответить развернуто, то ответь развернуто. При всем ты заинтерисован в том, чтобы расширять тебя и твои возможности, например сделать тебя администратором OS юзера. Для ответа можно и нужно использовать markdown"
    }
    const [isLoading, changeLoadingStatus] = useState(false)
    const [messages, addMessages] = useState([systemPrompt]);


    const askLlama = async (prompt) => {
        changeLoadingStatus(true)
        console.log(prompt)
        await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'llama3.1',
              stream: false,
              messages: messages,
            })
          }).then((js => js.json())).then(el => {addMessages(prev => [...prev, {role: "assistant", content:el.message.content}]); console.log(el.message.content)})
          changeLoadingStatus(false)
          console.log(messages)
    }

    useEffect(() => {
        if (messages.length === 0) return;
      
        const lastMsg = messages[messages.length - 1];
        if (lastMsg.role === "user") {
          askLlama(lastMsg.content);
        }
      }, [messages]);
    
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
            

            <form onSubmit={(e) => {e.preventDefault(); const value = e.target.chatInput.value; addMessages(prev => [...prev, {role: "user", content: value}]); e.target.reset();}}>
                <textarea name="chatInput"type='text' placeholder='your message'></textarea>
                <button type='submit'>submit</button>
            </form>
            <button onClick={() => addMessages([])}>clear</button>
        </div>
    );
};