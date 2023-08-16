'use client';
import Image from 'next/image'
import Link from 'next/link';
import { setUser } from '@/utils/redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/redux/store';
import getToken from '@/utils/auth';
import { useEffect, useState } from 'react';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = getToken(); 

    // Fetch user data using the token
    async function fetchUserData() {
      try {
        const response = await fetch('api/v1/userdata', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });        

        if (!response.ok) {
          return <p>no data</p>
        } 
          const userData = await response.json();
          dispatch(setUser(userData)); // Dispatch the setUser action with user data
          setUserData(userData);          
      } catch (error) {

      }
    }
    
    if (token) {
      fetchUserData();
    }
  }, [dispatch]);

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          id: {userData.user_id}
        </div>
      ) : (
        <p>no user data...</p>
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
