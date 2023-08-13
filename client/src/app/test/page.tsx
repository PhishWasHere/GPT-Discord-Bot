'use client';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Test() {
    const [data, setData] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api');
          const responseData = await response.json();
          setData(responseData.message);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      test: {data}
    </main>
  )
}
