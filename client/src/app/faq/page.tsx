import CardButton from '@/components/common/card-button';
import { url } from 'inspector';

export default function Faq() {
    const questions = [
        {
            key: 1,
            question: "What is Hostile?",
            answer: "Hostile is a open source chatbot powered by GPT 3.5 Turbo. It is designed to be sarcastic and insulting with every response."
        },
        {
            key: 2,
            question: "How do I use Hostile?",
            answer: "Invite Hostile to your server and type `/help` to get started, or send it a direct message and type `/help`."
        },
        {
            key: 3,
            question: "Will this bot have consistant updates?",
            answer: "No, this bot is a side project and will only be updated when I have the time, or if there is a demand to do so."
        },
        {
            key: 4,
            question: "Will the bot be hosted 24/7?",
            answer: "For now yes, but this is a side project and I cant guarantee that it will be hosted 24/7 in the future. If there is a demand I will keep it updated and hosted. If you want to host it yourself, you can do so by following the instructions on the GitHub repository."
        },
        {
            key: 5,
            question: "Is Hostile Open Source?",
            answer: "Yes, you can find the GitHub repository in the link below. If you want to host it yourself, you can do so by following the instructions on the GitHub repository.",
            url: "asdasd",
            text: 'Github Repository'
        },
        {
            key: 6,
            question: "Why do I need to login with my Discord acocunt?",
            answer: "Hostile uses your Discord account to identify you and your server. This is so that it can send messages to your server and respond to your messages."
        }
    ]

    return(
        <>
            <main className="text-text-primary min-h-screen py-8 max-w-5xl mx-auto">
                <h1 className="text-4xl font-semibold mt-4 xl:mt-8 text-primary ">Frequently Asked Questions</h1>
                <section className="flex flex-col gap-4 mt-8 xl:mt-16">
                    {questions.map((i) => (
                        <div key={i.key} className="flex justify-start">
                            <CardButton title={i.question} desc={i.answer} url={i.url} text={i.text} />
                        </div>
                    ))}
                </section>
            </main>
        </>
    )
}