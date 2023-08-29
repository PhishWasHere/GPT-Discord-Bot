'use client';
import { setUser, logout } from '@/utils/redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/redux/store';
import getToken from '@/utils/auth';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import MobileNav from './mobile';
import DesktopNav from './desktop';

export default function NavBar () {
    const [userData, setUserData] = useState(null);
    const dispatch = useDispatch<AppDispatch>();
    const [isSmall, setIsSmall] = useState(false);
    
    useEffect(() => { // Check if the screen is small
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setIsSmall(true);
            } else {
                setIsSmall(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        // {
        //     key: 'tokens',
        //     name: 'Tokens',
        //     link: '/tokens',
        //     path: 'M13 10V3L4 14h7v7l9-11h-7z'
        // },
        {
            key: 'documentation',
            name: 'Documentation',
            link: '/docs',
            path: 'M1 17V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M5 15V1m8 18v-4'
        },
        {
            key: 'faq',
            name: 'FAQ',
            link: '/faq',
            path: 'M4 7a3 3 0 0 1 3-3M5 19h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 1 7c0 4 4 5 4 9h4Z'
        },
        // {
        //     key: 'settings',
        //     name: 'Settings',
        //     link: '/settings',
        //     path: 'M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25'
        // },
    ];

    return(
        <nav className='container bg-primary'>
            {isSmall ? 
                (
                    <MobileNav sideOptions={sideOptions} userData={userData} handleLogout={handleLogout}/>
                ) : (
                    <DesktopNav sideOptions={sideOptions} userData={userData} handleLogout={handleLogout}/>
                )
            }
        </nav>  
    )
}
