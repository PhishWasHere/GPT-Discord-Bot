import Link from 'next/link';

export default function Tos() {
    return(
        <>
            <main className="min-h-screen border py-8">
                <article className="max-w-xl mx-auto text-text-primary bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold mb-4">Terms of Service</h1>
                    
                    <p className="mb-4">
                    By using the Hostile Discord bot, you agree to abide by the terms and conditions set forth by Discord and OpenAI. Make sure to review their respective terms of service:
                    </p>
                    
                    <p className="mb-2 text-sm">
                    Hostile is not affiliated with Discord or OpenAI in any way.
                    </p>

                    <ul className="list-disc ml-6 mb-4">
                    <li><Link className='hover:text-blue-600 underline transition' href="https://discord.com/terms" target="_blank" rel="noopener noreferrer">Discord Terms of Service</Link></li>
                    <li><Link className='hover:text-emerald-400 underline transition' href="https://openai.com/policies/terms-of-use" target="_blank" rel="noopener noreferrer">OpenAI Terms of Service</Link></li>
                    </ul>

                    
                    <p className="mb-4">
                    You must fully understand and accept that the Hostile's sole purpose is to be a sarcastic and insulting chatbot. Responses may be offensive.
                    </p>
                    
                    <p className="mb-4">
                    Please note that the application currently does not have a committed lifecycle, and it might be discontinued without warning.
                    </p>

                    <p className="mb-4">
                    All files are open source, however the application comes without any warranty. You can access the files on <Link className='underline hover:text-blue-600' href='https://github.com/PhishWasHere/GPT-Discord-Bot'>Github</Link>
                    </p>
                    
                    <p>
                    Hostile will save certain pieces of information, for more information about privacy and cookies, please refer to our <Link className='underline hover:text-blue-600 transition' href="/privacy-and-cookie">Privacy and Cookie Policy</Link>.
                    </p>

                    <p className="mt-4">
                    These terms may be amended at any time without notice.
                    </p>
                </article>
            </main>
        </>
    )
}