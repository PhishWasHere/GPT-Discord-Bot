import CardButton from '@/components/common/card-button';
import { text } from 'stream/consumers';

export default function Doc () {
    const arr = [
        {
            key: 'setup',
            question: "Setup",
            answer: "Invite Hostile to your server and stary any message with '!!' to get started, or you can send a direct message to Hostile to start a conversation..",
            url: "https://discord.com/api/oauth2/authorize?client_id=1135166612299862056&permissions=139586821184&scope=bot",
            text: "Invite To Server"
        },
        // {
        //     key: "commands",
        //     question: "Commands",
        //     answer: "Currently the only command is `/help` which will show you how to start using the bot.",
        // },
        {
            key: "persistent",
            question: "How to setup persistent messages",
            answer: "To setup persistent messages, you need to go to your dashboard and enable it there. You can follow the link below to get started.",
            url: "/dashboard",
            text: "Dashboard"
        },
        {
            key: "locally-hosting",
            question: "Locally hosting",
            answer: "If you want to host the bot yourself, download the files from the API branch, then setup all the .env files and run 'yarn' then 'yarn dev'. (You will need the following: MongoDB, Discord Bot Token, GPT3 API Key, NodeJS, NPM and Yarn)",
            url: "https://github.com/PhishWasHere/GPT-Discord-Bot/tree/api",
            text: "Github Repository"
        },
    ]
    return (
        <main className="text-text-primary min-h-screen py-8 max-w-5xl mx-auto">
            <h1 className="text-4xl font-semibold mt-4 xl:mt-8 text-primary">Documentation</h1>
            <section className="flex flex-col gap-4 mt-8 xl:mt-16">
                {arr.map((i) => (
                    <div key={i.key} id={i.key} className="flex justify-start">
                        <CardButton title={i.question} desc={i.answer} url={i.url} text={i.text} id={i.key}/>
                    </div>
                ))}
            </section>
        </main>
    )
}