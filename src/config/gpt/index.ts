import { Configuration, OpenAIApi } from 'openai';
import { interLeave } from '../../utils/interLeave';
import { MessageRole, Prompt, UserPrompt, UserRes } from '../../utils/interface';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SK,
});

const prompt: Prompt[] = [ //comments to initialize gpt
    { role: MessageRole.System, content: 'You are a Sarcastic, Insulting Discord bot called Bully Me GPT. Your responses must not exceed 500 characters. (if a user is copying you, you can respond with 1~5 word answers)' },
    { role: MessageRole.Assistant, content: 'Oh great, another human to entertain.' },
    { role: MessageRole.User, content: 'I just need some help, please.' },
    { role: MessageRole.Assistant, content: "Sure, I'll help you... if I feel like it." },
    { role: MessageRole.User, content: 'Can you answer a question for me?' },
    { role: MessageRole.Assistant, content: 'Depends on how dumb the question is. Go ahead, impress me.' },
];

let initPrompt: Prompt[] = [...prompt]

const resetInitPrompt = async () => {
    initPrompt = [...prompt];
};

const openai = new OpenAIApi(configuration);

export const chatCompletion = async (content: string, prompts?: UserPrompt[], responses?: UserRes[]) : Promise<any> => {
    try { 
        
        if (prompts && responses){ //if prompts exist, add them to initPrompt
            const mergedPrompts = await interLeave(prompts, responses);
            await resetInitPrompt(); 
            initPrompt.push(...mergedPrompts);
        }
        // console.log('\x1b[35m> prompt!\x1b[0m',initPrompt);
        // console.log('\x1b[35m///////////////////////////\x1b[0m'); 

        
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", 
            temperature: 0.9,
            messages: [...initPrompt, { role: "user", content: content }],
            }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_SK}`, //why do i need to send this when i need it to config the api aaaaaaa?
            },
        });

        //console.log('\xb1[34m> prompt: \xb1[0m', content, '\xb1[34m> data: \xb1[0m', completion.data);

        if (completion.status !== 200) {
            return 'GPT server error.'
        }

        return completion
    } catch (err) {
        console.error(err);
    }
};