'use client'

import { useEffect, useState } from 'react';

export default function WebSocketClient () {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Replace 'ws://localhost:8080' with the URL of your WebSocket server
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connection established.');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data.message);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <p>Received data: {message}</p>
    </div>
  );
};
