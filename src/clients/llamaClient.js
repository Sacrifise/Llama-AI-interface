export const llamaClient = {
    send: async (messages) => {
         const responce = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'llama3.2',
              stream: false,
              messages: messages,
            })
          })
          const data = await responce.json()
          return data.message
    }
}