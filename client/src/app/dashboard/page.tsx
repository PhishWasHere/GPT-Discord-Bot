'use client'
import { useAppSelector } from '@/utils/redux/store';

import NotLoggedIn from '@/components/isAuth_false';

import UserChart from '@/components/chart/directMessage';
import GuildChart from '@/components/chart/guild';

export default function Dashboard() {
  const userAuth = useAppSelector((state) => state.authReducer.value);

  if (!userAuth || userAuth.isAuth === false) return(<NotLoggedIn />);
  
  return (
    <> 
      <main className='text-gray-900'>
        <section className='grid grid-cols-2'>
        <UserChart/>
        <GuildChart/>
        </section>
      </main>
    </>
  );
}