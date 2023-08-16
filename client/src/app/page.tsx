'use client';
import Image from 'next/image'
import Link from 'next/link';
import { setUser } from '@/utils/redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/redux/store';
import getToken from '@/utils/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    // Fetch user data from the API endpoint
    fetch('/api/v1/userdata',{
      headers: {
        Authorization: `Bearer ${getToken()}` // Set the token in the Authorization header
      }
    })
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  console.log(userData);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>
      {userData ? (
        <div>
          {/* <h2>Welcome, {userData.username}!</h2> */}
          {/* Display other user data as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
      {/* <button className='text-red-600' onClick={handleLogin}> click</button> */}
      <div>
        <Link href="/test"> login </Link>
        <Link href="/dashboard"> dash </Link>

      </div> 
    </main>
  )
}
