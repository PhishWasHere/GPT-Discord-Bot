'use client'
import Link from 'next/link';
import { useAppSelector } from '@/utils/redux/store';
import {getUserData, getGuildUsage} from '@/utils/auth';

import { useEffect, useState } from 'react';
import NotLoggedIn from '@/components/isAuth_false';

import BarChart from '@/components/chart';

const getData = (async () => {
  const data = await getUserData();
  
  return data;
});

export default function Dashboard() {
  const userAuth = useAppSelector((state) => state.authReducer.value);
  
  if (!userAuth || userAuth.isAuth === false) return(<NotLoggedIn />);
  
  return (
    <> 
      <main className='text-gray-900'>
        <BarChart/>
      </main>
    </>
  );
}