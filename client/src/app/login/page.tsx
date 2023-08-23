'use client';
import Link from 'next/link';

export default function Login() {
    
    const handleLogin = () => {
        // Redirect user to the backend's OAuth route
        window.location.href = '/api/v1/auth';
    };

    return(
        <>
            <main className="relative py-16 bg-gradient-to-br from-sky-50 to-gray-200 w-full">  
                <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
                    <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                        <div className="rounded-xl bg-white shadow-xl">

                            <section className="p-6 sm:p-16">

                                <div className="space-y-4">
                                    <img src="https://tailus.io/sources/blocks/social/preview/images/icon.svg" loading="lazy" className="w-10" alt="tailus logo"/>
                                    <h2 className="mb-8 text-2xl text-cyan-900 font-bold">Sign in to unlock the best of Bully Me GPT.</h2>
                                </div>

                                <div className="mt-16 grid space-y-4">
                                    <button onClick={() => handleLogin()} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-indigo-400 focus:bg-blue-50 active:bg-blue-100">
                                        <div className="relative flex items-center space-x-4 justify-center">
                                            <img src="discord.png" className="absolute left-0 w-5" alt="discord logo"/>
                                            <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Discord</span>
                                        </div>
                                    </button>
                                    <p className='mx-auto text-sm text-gray-600 hover:text-blue-600 transition duration-300'><Link href='/#'>Why cant I create an account?</Link></p>
                                </div>

                                <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
                                    <p className="text-xs">By proceeding, you agree to our <Link href='/policy/tos' className="underline hover:text-blue-600 transition duration-300">Terms of Service</Link> and confirm you have read our <Link href="/policy/privacy" className="underline hover:text-blue-600 transition duration-300">Privacy and Cookie Statement</Link>.</p>
                                </div>
                            
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}