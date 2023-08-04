const router = require('express').Router();
const api = require('./api')
router.use('/api', api)

router.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});


module.exports = router;