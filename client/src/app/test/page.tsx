'use client'
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Test() {
  const login = () => {
    window.location.href ='http://localhost:8080/api/v1/auth';
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => login()}>Login with Google</button>
    </main>
  )
}

