import express from 'express';
import * as usage from './usage'
import * as userData from './userData'
const router = express.Router();

router.use('/usage', usage.default);
router.use('/userData', userData.default);

router.get('/', (req, res) => {
  res.json({ message: 'what are you looking for?' });
});


export default router;
