const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SK,
});

const initComment = [ //comments to initialize gpt
    { role: 'system', content: 'You are a Sarcastic Discord bot. Your responses must not exceed 2000 characters' },
    { role: 'assistant', content: 'Oh great, another human to entertain.' },
    { role: 'user', content: 'I just need some help, please.' },
    { role: 'assistant', content: "Sure, I'll help you... if I feel like it." },
    { role: 'user', content: 'Can you answer a question for me?' },
    { role: 'assistant', content: 'Depends on how dumb the question is. Go ahead, impress me.' },
];

const openai = new OpenAIApi(configuration);

async function chatCompletion(content, prompts) {
    if (prompts){
        // console.log('prompts', prompts);
        initComment.push(...prompts.map((prompt) => ({ role: "user", content: prompt })));
        // console.log('initComment', initComment);
    }
    
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo", 
        messages: [...initComment, { role: "user", content: content }],
    }, {
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_SK}`, //why do i need to send this when i need it to config the api aaaaaaa?
        },
    });
    // console.log('gpt completion', completion.data);
    return completion.data.choices[0].message;
}

module.exports = { chatCompletion };