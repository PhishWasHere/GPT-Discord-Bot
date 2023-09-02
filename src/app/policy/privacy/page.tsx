import Link from 'next/link'


export default function Privacy() {

    const arr = [
        {
            id: 'cookies',
            title: 'Cookies',
            content: 'Cookies are used to manage login sessions and track login status. They will have a time-to-live (TTL) of 3 days.'
        },
        {
            id: 'login',
            title: 'Login and Authentication',
            content: 'Login is performed using Discord OAuth. We do not collect or have access to user emails or passwords.'
        },
        {
            id: 'login-data',
            title: 'Login Data Collection',
            content: 'Upon login or agreement of our terms of service, the following data will be stored: user ID, username, and guilds where you have owner status. This data will be retained until a database reset.'
        },
        {
            id: 'server-data',
            title: 'Server Data Collection',
            content: 'Upon adding the bot to a server, the following data will be stored: server ID, server name, and server owner ID. This data will be retained until a database reset.'
        },
        {
            id: 'message-data',
            title: 'Message Data Collection',
            content: 'Upon sending a message to the bot, the following data will be stored: message ID, message content, and message author ID. This data will be retained until a database reset.'
        },
        {
            id: 'data-usage',
            title: 'Data Usage',
            content: 'Data collected will be used to provide the bot with persistent data to maintain context, and to improve the bot. Data will not be sold or shared with third parties.'
        },
        {
            id: 'gpt',
            title: 'GPT3 Integration',
            content: 'All prompts to the bot will be passed to OpenAI\'s GPT-3.5 Turbo. Prompts will contain the username and message in the format "username: message". If persistence is enabled, the past 7 messages and responses will be sent to GPT in this format.'
        },
    ]
    return(
        <main className=" min-h-screen py-8">
            <article className="max-w-xl mx-auto text-text-primary bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Privacy and Cookies Policy</h1>
        
                <p className="mb-4">
                    Our Privacy and Cookies Policy outlines how we collect, use, and store your data while using the Hostile Discord bot. 
                    <br/>By using the bot, you consent to the practices described below.
                </p>

            {arr.map((i) => (
                <>
                    <h2 key={i.id} id={i.id} className="text-lg font-semibold mb-2">{i.title}</h2>
                    <p className="mb-4">
                        {i.content}
                    </p>
                </>
            ))}

                <h2 className="text-lg font-semibold mb-2">Discord and OpenAI Privacy Policies</h2>
                <p className="mb-4">
                    It{`'`}s important to review the privacy policies 
                    of <Link className='underline hover:text-blue-600' href="https://discord.com/privacy" target="_blank" rel="noopener noreferrer">Discord</Link> and <Link className='underline hover:text-emerald-400' href="https://platform.openai.com/docs/privacy-policy" target="_blank" rel="noopener noreferrer">OpenAI</Link> as
                    well before using the Hostile bot.
                </p>

                <p className="mb-4">
                Please note that all the information mentioned above is subject to change without notice. We recommend checking this policy regularly for updates.
                </p>

                <p>
                For our complete Terms of Service, please refer to our <Link className='underline hover:text-blue-600' href="/policy/tos">Terms of Service</Link>.
                </p>
            </article>
        </main>
        
    )
}