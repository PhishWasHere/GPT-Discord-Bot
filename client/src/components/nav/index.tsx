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

    const handleShowComponent = () => { //toggle for the mobile menu
        setShowComponent(!showComponent);
    };

    const handleLogout= () =>{ //logout function
        Cookies.remove('token')
        logout();
        window.location.reload();
    }

    useEffect(() => { // Fetch user data on mount
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
        // {
        //     key: 'acocunt',
        //     name: 'Account',
        //     link: '/account',
        //     path: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        // },
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
            key: 'documentation',
            name: 'Documentation',
            link: '/documentation',
            path: 'M1 17V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M5 15V1m8 18v-4'
        },
        {
            key: 'faq',
            name: 'FAQ',
            link: '/faq',
            path: 'M4 7a3 3 0 0 1 3-3M5 19h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 1 7c0 4 4 5 4 9h4Z'
        },
        {
            key: 'settings',
            name: 'Settings',
            link: '/settings',
            path: 'M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25'
        },
    ];

    return(
        <nav className='container bg-primary'>
            <section className="sm:hidden">
                <div className="max-w-screen-xl flex sm:hidden flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center">
                        <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label='logo'>
                            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                        </svg>
                        {!userData ? (
                                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Hostile</span>
                        ) :(
                                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">{userData.username}</span>
                        )}
                    </Link>

                    <button onClick={() => handleShowComponent()} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden" aria-controls="navbar-dropdown">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    
                    <div className={`w-full md:block md:w-auto ${showComponent ? '' : 'hidden' }`} id="navbar-dropdown">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {sideOptions.map((i) => (
                                <li key={i.key} className='flex border-2 shadow-sm my-0.5 rounded-lg'>
                                    <Link href={i.link} className="block py-2 pl-3 pr-4 text-text-secondary">{i.name}</Link>
                                </li>
                            ))}
                            
                            {!userData ? (
                                <>
                                    <Link href="/login">
                                        <li className="flex border-2 shadow-sm my-0.5 rounded-lg">
                                            <p className="block py-2 pl-3 pr-4 text-text-secondary" >Login</p>
                                        </li>
                                    </Link>
                                </>
                                ) : (
                                <>
                                    <li className='flex border-2 shadow-sm my-0.5 rounded-lg'>
                                        <button onClick={() => handleLogout()}>
                                            <p className="block py-2 pl-3 pr-4 text-text-secondary" >Logout</p>
                                        </button>
                                    </li>
                                </>
                            )}
                            <Link href='/policy' className='flex justify-center'>
                                <p className='text-gray-400 text-sm mt-3 text-center hover:text-white'>Terms & policies </p>
                            </Link>
                        </ul>
                    </div>
                </div>
            </section>
            
            <aside className='sm:flex hidden'>
                <div id="sidebar" className='fixed top-0 left-0 z-40 w-44 h-screen transition-transform -translate-x-full sm:translate-x-0' aria-label="Sidebar">
                    <section className='md:flex flex-col items-center w-48 h-screen overflow-hidden text-gray-100 bg-primary'>
                        <section className="flex items-center w-full px-3 mt-3">
                            {userData ? (
                            <>
                                <div className='w-8 h-8 fill-current'>
                                    <p className='ml-2 self-center text-xl font-semibold whitespace-nowrap text-white'><Link href='/'>{userData.username}</Link></p>
                                </div>
                            </>
                            ) : (
                            <>
                                <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                                </svg>
                                <span className="ml-2 self-center text-xl font-semibold whitespace-nowrap text-white"><Link href='/'>Hostile</Link></span>
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

                        <div className="sticky w-full mt-auto">
                            <Link href='/policy' className='flex justify-center'>
                                <p className='text-gray-400 text-sm mb-2 text-center hover:text-white'>Terms & policies</p>
                            </Link>
                            {!userData ? (
                                <Link href='/login' className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300">
                                    <svg className="w-6 h-6 stroke-current mt-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3" /> 
                                    </svg>
                                    <span className="ml-2 text-sm font-medium">Login</span>
                                </Link>
                            ) : (
                                <button onClick={() => handleLogout()} className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300">
                                    <svg className="w-6 h-6 stroke-current mt-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" /> 
                                    </svg>
                                    <span className="ml-2 text-sm font-medium">Logout</span>
                                </button>
                            )}
                        </div>
                    </section>
                </div>
            </aside>
        </nav>  
    )
}
