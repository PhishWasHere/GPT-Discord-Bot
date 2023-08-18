'use client'
import Link from 'next/link';
import { useAppSelector } from '@/utils/redux/store';
import {getUserData} from '@/utils/auth';

import { useEffect, useState } from 'react';
import NotLoggedIn from '@/components/isAuth_false';


import UsageChart from '@/components/chart';

export default function Dashboard() {
  const userData = useAppSelector((state) => state.authReducer.value);
  
  return (
    <> 
    {userData.isAuth === false || !userData ? <NotLoggedIn /> : null}
      <main className='text-gray-900'>
        <UsageChart />
      </main>
    </>
  );
}