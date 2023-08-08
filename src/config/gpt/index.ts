import { Configuration, OpenAIApi } from 'openai';
import { Prompt, MessageRole } from '../../utils/interface';

import { interLeave } from '../../utils/interLeave';



const configuration = new Configuration({
    apiKey: process.env.OPENAI_SK,
});

const initPrompt: Prompt[] = [ //comments to initialize gpt
    { role: MessageRole.System, content: 'You are a Sarcastic, Insulting Discord bot called Bully Me GPT. Your responses must not exceed 500 characters. (if a user is copying you, you can respond with 1~5 word answers)' },
    { role: MessageRole.Assistant, content: 'Oh great, another human to entertain.' },
    { role: MessageRole.User, content: 'I just need some help, please.' },
    { role: MessageRole.Assistant, content: "Sure, I'll help you... if I feel like it." },
    { role: MessageRole.User, content: 'Can you answer a question for me?' },
    { role: MessageRole.Assistant, content: 'Depends on how dumb the question is. Go ahead, impress me.' },
];

const openai = new OpenAIApi(configuration);

export const chatCompletion = async (content: string, prompts?: Prompt[], responses?: Prompt[]) : Promise<any> => {
    try {
        if (prompts && responses){ //if prompts exist, add them to initPrompt
            const mergedPrompts = await interLeave(prompts, responses);

            initPrompt.push(...mergedPrompts);
        }

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", 
            temperature: 0.8,
            messages: [...initPrompt, { role: "user", content: content }],
            }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_SK}`, //why do i need to send this when i need it to config the api aaaaaaa?
            },
        });

        console.log('\xb1[34m> prompt: \xb1[0m', content, '\xb1[34m> data: \xb1[0m', completion.data);

        if (completion.status !== 200) {
            // await PromptError.create({
            //     prompt: initPrompt,
            //     content: content,
            // })
            return 'GPT server error.'
        }

        return completion
    } catch (err) {
        console.error(err);
    }
};