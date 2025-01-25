import React, { useState } from 'react'
import Message from './message';


export default function Chat() {
    const [messages, addMessages] = useState([]);
    return ( 
        <div>
            <div className='chat-cont'>
                {console.log(messages)}
                {messages.map((el) => <Message text={el}/>)}
            </div>

            <form on onSubmit={(e) => {e.preventDefault(); addMessages([...messages, e.target.chatInput.value]); e.target.reset()}}>
                <input name="chatInput"type='text' placeholder='your message'></input>
                <button type='submit'>submit</button>
            </form>
            <button onClick={() => addMessages([])}>clear</button>
        </div>
    );
};