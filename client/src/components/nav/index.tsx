'use client';
import { setUser, logout } from '@/utils/redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/redux/store';
import getToken from '@/utils/auth';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function NavBar () {
    const [userData, setUserData] = useState(null);
    const dispatch = useDispatch<AppDispatch>();
    const [showComponent, setShowComponent] = useState(false);

    const handleShowComponent = () => {
        setShowComponent(!showComponent);
    };

    const handleLogout= () =>{        
        Cookies.remove('token')
        logout();
        window.location.reload();
    }
    useEffect(() => {
      const token = getToken(); 
        
      if(!token){
        return;
      }

      // Fetch user data using the token
      (async () => {
        try {
            const response = await fetch('api/v1/userdata', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });        
    
            if (!response.ok) {
              return <p>internal server error</p>
            } 
            
            const userData = await response.json();
            dispatch(setUser(userData)); // Dispatch the setUser action with user data
            setUserData(userData);

          } catch (error) {
              console.error('An unexpected error happened occurred:', error);
          }
        })();
    }, [dispatch]);

    const sideOptions = [
        {
            key: 'acocunt',
            name: 'Account',
            link: '/account',
            path: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
            key: 'dashboard',
            name: 'Dashboard',
            link: '/dashboard',
            path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        },
        {
            key: 'tokens',
            name: 'Tokens',
            link: '/tokens',
            path: 'M13 10V3L4 14h7v7l9-11h-7z'
        },
        {
            key: 'faq',
            name: 'FAQ',
            link: '/faq',
            path: 'M12 19c-1.105 0-2-.895-2-2 0-1.104.895-2 2-2s2 .896 2 2c0 1.105-.895 2-2 2zm0-14c3.313 0 6 2.687 6 6 0 3.313-2.687 6-6 6s-6-2.687-6-6c0-3.313 2.687-6 6-6zm-2'
        },
        {
            key: 'settings',
            name: 'Settings',
            link: '/settings',
            path: 'M12 14l9-5-9-5-9 5 9 5z'
        },
    ];
  
    return(
        <nav className='h-full sticky top-0 z-50 w-44 flex flex-col space-y-10 items-center justify-center bg-gray-900'>
                    {/* mobile nav */}
                <div 
                onMouseEnter={() => handleShowComponent()} 
                onMouseLeave={() => handleShowComponent()} 
                className={`md:hidden flex-col items-center w-16 h-full overflow-hidden text-gray-100 bg-gray-900 rounded-r ${showComponent ? 'hidden' : ''}`}
                > 
                    <svg className="w-8 h-8 fill-current mx-auto mt-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>

                    <ul className="w-full px-2">
                        {sideOptions.map((i) => (
                            <li key={i.key} className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                                <Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href={i.link}>
                                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={i.path} />
                                    </svg>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className=''>  
            <div className={`md:flex flex-col items-center w-48 h-screen overflow-hidden text-gray-100 bg-gray-900 rounded-r ${showComponent ? '' : 'hidden'}`}>
                    <section className="flex items-center w-full px-3 mt-3">
                        {userData ? (
                            <>
                            <div className='w-8 h-8 fill-current'>
                                <p className='ml-2 text-xl font-bold'><Link href='/'>{userData.username}</Link></p>
                            </div>
                            </>
                        ) : (
                            <>
                            <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                            </svg>
                            <span className="ml-2 text-sm font-bold"><Link href='/'>Hostile GPT</Link></span>
                            </>
                        )}
                    </section>

                    <ul className="w-full px-2">
                        {sideOptions.map((i) => (
                            <li key={i.key} className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                                <Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href={i.link}>
                                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={i.path} />
                                    </svg>
                                    <span className="ml-2 text-sm font-medium">{i.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="sticky w-full">
                        {!userData ? (
                            <Link href='/login' className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300">
                                <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="" /> 
                                </svg>
                                <span className="ml-2 text-sm font-medium">Login</span>
                            </Link>
                        ) : (
                            <button onClick={() => handleLogout()} className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300">
                                <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="" /> 
                                </svg>
                                <span className="ml-2 text-sm font-medium">Logout</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>  
    )
}