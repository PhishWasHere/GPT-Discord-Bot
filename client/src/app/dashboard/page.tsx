'use client'
import { useAppSelector } from '@/utils/redux/store';

import NotLoggedIn from '@/components/isAuth_false';

import UserChart from '@/components/dashboard/chart/userChart';
import GuildChart from '@/components/dashboard/chart/guildChart';
import Credit from '@/components/dashboard/credit';

import CardButton from '@/components/common/card-button';

export default function Page() {
  const userAuth = useAppSelector((state) => state.authReducer.value);

  if (!userAuth || userAuth.isAuth === false) return(<NotLoggedIn />);
  
  return (
    <> 
      <main className='text-gray-900'>
        <div className='mt-6'>
          <Credit/>
        </div>
        {/* <section className='container mx-auto'>
          <UserChart/>
        </section>
        <section className='p-8'>
          <GuildChart/>
        </section> */}
      </main>
    </>
  );
}