import CardButton from '@/components/common/card-button';

export default function Doc () {
    const arr = [
        {
            key: 1,
            question: "Setup",
            answer: "To setup the bot, you need to invite it to your server and type `/help` to get started, or send it a direct message and type `/help`.",
        },
        {
            key: 2,
            question: "Commands",
            answer: "Currently the only command is `/help` which will show you how to start using the bot.",
        },
        {
            key: 3,
            question: "locally hosting",
            answer: "If you want to host the bot yourself, download the files from the Local branch, then setup all the .env files and run 'yarn' then 'yarn dev'. (You will need the following: MongoDB, Discord Bot Token, GPT3 API Key, NodeJS, and Yarn)",
            url:'a',
            text:'Download link'
        }
    ]
    return (
        <main className="text-text-primary min-h-screen py-8 max-w-5xl mx-auto">
            <h1 className="text-4xl font-semibold mt-4 xl:mt-8 text-primary">Documentation</h1>
            <section className="flex flex-col gap-4 mt-8 xl:mt-16">
                {arr.map((i) => (
                    <div key={i.key} className="flex justify-start">
                        <CardButton title={i.question} desc={i.answer} url={i.url} text={i.text} />
                    </div>
                ))}
            </section>
        </main>
    )
}