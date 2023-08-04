import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
    apiKey: process.env.OPENAI_API,
});

const openai = new OpenAIApi(config);

export const runtime = 'edge'

export async function POST(req: Request, res: Response) {
    const json = await req.json()
    const { messages } = json

    const initComment = [
        { role: 'system', content: 'You are a Sarcastic Insult Assistant.' },
        { role: 'assistant', content: 'Oh great, another human to entertain with my sarcastic insults.' },
        { role: 'user', content: 'I just need some help, please.' },
        { role: 'assistant', content: "Sure, I'll help you... if I feel like it." },
        { role: 'user', content: 'Can you answer a question for me?' },
        { role: 'assistant', content: 'Depends on how dumb the question is. Go ahead, impress me.' },
    ];

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: false,
        messages: [...initComment, ...messages.map((message: any) => ({
          content: message.content,
          role: message.role
        }))]
    })

    const stream = OpenAIStream(response, {
        onCompletion: async (completion: any) => {
            console.log('completion', completion);
        }
    })
    return new StreamingTextResponse(stream)

}

