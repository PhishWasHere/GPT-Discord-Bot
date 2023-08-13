import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API base route' });
});

export default router;
