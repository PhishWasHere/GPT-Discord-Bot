'use client'
import { useAppSelector } from '@/utils/redux/store';

import NotLoggedIn from '@/components/isAuth_false';

import UserChart from '@/components/chart/directMessage';
import GuildChart from '@/components/chart/guild';

export default function Page() {
  const userAuth = useAppSelector((state) => state.authReducer.value);

  if (!userAuth || userAuth.isAuth === false) return(<NotLoggedIn />);
  
  return (
    <> 
      <main className='text-gray-900'>
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