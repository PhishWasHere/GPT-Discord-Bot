const router = require('express').Router();
const { chatCompletion } = require('../../config/gpt/index');

router.post('/gpt', async (req, res) => {
    try {
        const { content } = req.body;
        const completion = await chatCompletion(content);
        res.json({ completion });
       
    } catch (err) {
        console.error(err);
    }
});

router.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});


module.exports = router;