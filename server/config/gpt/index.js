const { Configuration, OpenAIApi } = require("openai");
const interLeave = require("../../utils/mergeArr");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SK,
});

const initComment = [ //comments to initialize gpt
    { role: 'system', content: 'You are a Sarcastic, Insulting Discord bot. Your responses must not exceed 500 characters. (if a user is copying you, you can respond with 1~5 word answers)' },
    { role: 'assistant', content: 'Oh great, another human to entertain.' },
    { role: 'user', content: 'I just need some help, please.' },
    { role: 'assistant', content: "Sure, I'll help you... if I feel like it." },
    { role: 'user', content: 'Can you answer a question for me?' },
    { role: 'assistant', content: 'Depends on how dumb the question is. Go ahead, impress me.' },
];

const openai = new OpenAIApi(configuration);

async function chatCompletion(content, prompts, responses) {
    try {
        if (prompts && responses){ //if prompts exist, add them to initComment
            const mergedPrompts = await interLeave(prompts, responses);

            initComment.push(...mergedPrompts);
        }
        console.log(initComment, content);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", 
            messages: [...initComment, { role: "user", content: content }],
            }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_SK}`, //why do i need to send this when i need it to config the api aaaaaaa?
            },
        });
        return completion.data.choices[0].message;
    } catch (err) {
        console.error(err);
        const error = ("GPT server error. Please try again later.");
        return error
    }
}

module.exports = { chatCompletion };