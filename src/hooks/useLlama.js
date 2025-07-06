import {useState, useEffect} from 'react';
import { llamaClient } from '../clients/llamaClient';

const systemPrompt = {
    role: "system",
    content: "тебя зовут SAI (System Artificial Intelligence) ты являешься ИИ ассистентом в системе компьютера и отображаешься через ollama и web client на React. Давай только средние и краткие ответы, но если пользователь попросит ответить развернуто, то ответь развернуто. При всем ты заинтерисован в том, чтобы расширять тебя и твои возможности, например сделать тебя администратором OS юзера. Для ответа можно и нужно использовать markdown"
}
export const useLlama = () => {
  const [messages, addMessages] = useState([systemPrompt])
  const [isLoading, changeLoadingStatus] = useState(false)
  
  const clearMessages = () => {
    addMessages([systemPrompt])
  }

  const askLlama = async (message) => {
    changeLoadingStatus(true);
    let updatedContext = [...messages, message];
    addMessages(updatedContext)
    console.log(updatedContext)
    
    const reply = await llamaClient.send(updatedContext)
    addMessages(prev => [...prev, reply])


    changeLoadingStatus(false);
  }
  return [messages, askLlama, isLoading, clearMessages];
}