import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

type UserProps = {
    username?: string;
    avatar?: string ;
}

type SideOptionsProps = {
    key: string;
    name: string;
    link: string;
    path: string;
}

type NavProps = {
    sideOptions: SideOptionsProps[];
    userData?: UserProps | null;
    handleLogout?: any;
}

const MobileNav: React.FC<NavProps> = ( {sideOptions, userData, handleLogout} ) => {
    const [showComponent, setShowComponent] = useState(false);

    const handleShowComponent = () => { //toggle for the mobile menu
        setShowComponent(!showComponent);
    };

    return (
        <section className="sm:hidden">
            <div className="max-w-screen-xl flex sm:hidden flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    {!userData ? (
                        <>
                            <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label='logo'>
                                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                            </svg>
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Hostile</span>
                        </>
                    ) :(
                        <>
                            {userData.avatar? (
                                <Image width={40} height={40} src={userData.avatar} alt='avatar' className='rounded-full'/>    
                            ) : (
                                null
                            )}
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">{userData.username}</span>
                        </>
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
                            <Link href={i.link} key={i.key} className='border-2 shadow-sm my-0.5 rounded-lg'>
                                <p className="block py-2 pl-3 pr-4 text-text-secondary">{i.name}</p>
                            </Link>
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
                                <li className='border-2 shadow-sm my-0.5 rounded-lg'>
                                    <button onClick={() => handleLogout()}>
                                        <p className="block py-2 pl-3 pr-4 text-text-secondary" >Logout</p>
                                    </button>
                                </li>
                            </>
                        )}
                        <li className='flex justify-center'>
                            <Link href='/policy' className='flex text-gray-400 text-sm mt-3 text-center hover:text-blue-600'>Terms & policies </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>    
    )
}

export default MobileNav;