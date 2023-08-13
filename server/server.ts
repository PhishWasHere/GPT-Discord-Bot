import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = process.env.PORT || 8080;

import db from './config/mongo';
import {clientStart} from './discord';

import routes from './routes';

db.once('open', async () => {
  console.log(`\x1b[35m> Ready!\x1b[0m Connected to MongoDB`);
    try {
    const app = express() 

    app.use(cors())
    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    app.use('/api', routes)

    app.listen(port, () => {
      console.log(`\x1b[35m> Ready!\x1b[0m on http://localhost:${port}`);
    })

    // clientStart();
  } catch (err: any) {
    console.error(err.stack)
    process.exit(1)
  }
});

