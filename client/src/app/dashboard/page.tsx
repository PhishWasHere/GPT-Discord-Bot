'use client'
import { useAppSelector } from '@/utils/redux/store';
import { useEffect, useState } from 'react';

import NotLoggedIn from '@/components/isAuth_false';

import ServerList from '@/components/dashboard/serverList';
import UserChart from '@/components/dashboard/chart/userChart';
import GuildChart from '@/components/dashboard/chart/guildChart';
import Credit from '@/components/dashboard/credit';
import Button from '@/components/common/button/button';

export default function Page() {
  const userAuth = useAppSelector((state) => state.authReducer.value);
  const [showServers, setShowServers] = useState(false);
  
  if (!userAuth || userAuth.isAuth === false) return(<NotLoggedIn />);
  
  return (
    <> 
      <main className='text-gray-900'> 
        
        <section className='mt-6'>
          <Credit/>
        </section>

        <section className='flex justify-center my-3'>
          <ServerList/> 
        </section>

        <section className='container mx-auto'>
          <UserChart/>
        </section>

        <section className='p-8'>
          <GuildChart/>
        </section>
      </main>
    </>
  );
}