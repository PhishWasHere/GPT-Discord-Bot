import Link from "next/link"
import Image from "next/image"
 
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

const DesktopNav: React.FC<NavProps> = ( {sideOptions, userData, handleLogout} ) => {
    return(
        <aside className='sm:flex hidden'>
            <div id="sidebar" className='fixed top-0 left-0 z-40 w-56 h-screen transition-transform -translate-x-full sm:translate-x-0' aria-label="Sidebar">
                <section className='md:flex flex-col items-center  h-screen overflow-hidden text-gray-100 bg-primary'>
                    <section className="flex items-center w-full px-3 mt-3">
                        {userData ? (
                        <>
                            <div className='flex w-8 h-8 fill-current'>
                                {userData.avatar ? (
                                    <Image width={50} height={50} src={userData.avatar} alt='avatar' className='rounded-full'/>    
                                ) : (
                                    null
                                )}
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
                        <ul  className='flex justify-center'>
                            <Link href='/policy' className='text-gray-400 text-sm mb-2 text-center hover:text-white'>Terms & Policies</Link>
                        </ul>
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
    )
}

export default DesktopNav;