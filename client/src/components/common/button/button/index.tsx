import Link from 'next/link';

export default function Button({ text, url }: { text: string; url?: string }) {
    return(
        <button className="group sm:w-auto w-full h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-indigo-400 focus:bg-blue-50 active:bg-blue-100">
            {url? (
            <Link href={url}>
                <div className="relative flex items-center space-x-4 justify-center">
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">{text}</span>
                </div>
            </Link>
            ) : (
                <div className="relative flex items-center space-x-4 justify-center">
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">{text}</span>
                </div>
            )}
        </button>
    )
}