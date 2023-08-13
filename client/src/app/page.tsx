'use client';
import Image from 'next/image'
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    try{
      fetch('http://localhost:8080/api').then(res => res.json()).then(data => console.log(data));
    }
    catch(err){
      console.log(err);
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hi
    </main>
  )
}
