import Link from 'next/link'


export default function Privacy() {
    return(
        <main className=" min-h-screen py-8">
            <article className="max-w-xl mx-auto text-text-primary bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Privacy and Cookies Policy</h1>
        
                <p className="mb-4">
                    Our Privacy and Cookies Policy outlines how we collect, use, and store your data while using the Hostile Discord bot. 
                    <br/>By using the bot, you consent to the practices described below.
                </p>
        
                <h2 id='cookies' className="text-lg font-semibold mb-2">Cookies</h2>
                <p className="mb-4">
                    Cookies are used to manage login sessions and track login status. They will have a time-to-live (TTL) of 3 days.
                </p>
        
                <h2 id='data' className="text-lg font-semibold mb-2">Data Collection</h2>
                <p className="mb-4">
                    Upon login or agreement of our terms of service, the following data will be stored: user ID, username, and guilds where you have owner status. 
                    <br/>This data will be retained until a database reset.
                </p>

                <p className="mb-4">
                    Upon adding this bot to your server and agreeing to our terms of service, the following information will be stored: guild ID, guild name, and guild owner ID. 
                    <br/>This data will be retained until a database reset.
                </p>

                <p className="mb-4">
                    When prompted within the Discord app, the following information will be stored for 7-30 days (for the purpose of persistence and for debug purposes):
                </p>
                <ul className="list-disc ml-6 mb-4">
                    <li>If prompted in a guild: prompt author{`'`}s user ID, username, global name, prompt message, message ID, GPT response, and token cost.</li>
                    <li>If prompted in a direct message: global name, prompt message, message ID, GPT response, and token cost.</li>
                </ul>
        
                <h2 id='login' className="text-lg font-semibold mb-2">Login and Authentication</h2>
                <p className="mb-4">
                    Login is performed using Discord OAuth. We do not collect or have access to user emails or passwords.
                </p>
        
                <h2 id='gpt' className="text-lg font-semibold mb-2">GPT3 Integration</h2>
                <p className="mb-4">
                All prompts to the bot will be passed to OpenAI{`'`}s GPT-3.5 Turbo. Prompts will contain the username and message in the format {`"`}username: message{`"`}. 
                If persistence is enabled, the past 7 messages and responses will be sent to GPT in this format.
                </p>

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