import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
const router = express.Router();

router.use('/', (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
      return res.status(401).send('Unauthorized: No token provided');
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  req.user = decoded.user!;
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'API base route' });
});

router.get('/userdata', (req, res) => {
  // Check if the user is authenticated, and if so, send the user data
  res.send({message: 'success'})
});

export default router;
