import Link from 'next/link'

export default function NotLoggedIn (){
    return(
        <main className="relative py-16 bg-gradient-to-br from-sky-50 to-gray-200 w-full ">
            <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
                <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                    <div className="rounded-xl bg-white shadow-xl">
                        <section className="p-6 sm:p-16">
                            <div className="space-y-4">
                                <h2 className="mb-8 text-2xl text-cyan-900 font-bold text-center">Login to view this page</h2>
                            </div>

                            <Link href='/login' className="mt-16 grid space-y-4 group">
                                <button className="relative flex items-center space-x-4 justify-center h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-indigo-400 focus:bg-blue-50 active:bg-blue-100">
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Login</span>
                                </button>
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}