'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    // Replace 'ws://localhost:8080' with the URL of your WebSocket server
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connection established.');
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setId(data.message.id);      
      setMessage(data.message.cleanContent);      
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  const handleSendMessage = () => {
    // Replace 'ws://localhost:8080' with the URL of your WebSocket server
    const ws = new WebSocket('ws://localhost:8080');
  
    ws.onopen = () => {
      console.log('WebSocket connection established.');
      // When the WebSocket connection is established, send the message to the backend      
      const messageObject = {
        id: id,
        gpt_response: inputValue,
      };
      ws.send(JSON.stringify(messageObject));
    };
  
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setResponse(data.gpt_response);
      ws.close(); // Close the WebSocket connection after receiving the response
    };
  
    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };
  };

  return (
    <main className="">
      <p>Received data: {message}</p>
      <div>
        <input
          className='text-black'
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send to Backend</button>
        <p>Response from Backend: {response}</p>
      </div>
    </main>
  )
}