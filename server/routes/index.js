const router = require('express').Router();
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SK,
});

const openai = new OpenAIApi(configuration);

router.post('/chat', async (req, res) => {
    try {
        const { content } = req.body;
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: content }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_SK}`,
                },
            }
        );
        console.log(completion.data.choices[0].message);
    } catch (err) {
        console.error(err);
    }
});


module.exports = router;