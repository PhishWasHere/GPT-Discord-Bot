require('dotenv').config();

const express = require('express')
const cors = require('cors')
const bodyParser  = require('body-parser')
const apiVali = require('./utils/auth/index'); //middleware for validating api key so random people cant post to the api

const port = process.env.PORT || 3000

const route = require('./routes'); 

const db = require('./config/mongo/index'); 
const { client } = require('./config/discord/index');

const clientStart = () => {
  client.login(process.env.DISCORD_TOKEN);
  client.once('ready', c => {
    console.log(`\x1b[35m> Ready!\x1b[0m Logged in as ${c.user.tag}`);
  });
};

db.once('open', async () => {
  console.log(`\x1b[35m> Ready!\x1b[0m Connected to MongoDB`);
    try {
    const app = express() 

    app.use(cors())
    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    app.use(apiVali) //middleware for validating api key so random people cant post to the api
    app.use('/', route); // routes

    app.listen(port, () => {
      console.log(`\x1b[35m> Ready!\x1b[0m on http://localhost:${port}`);
    })

    clientStart();
  } catch (err) {
    console.error(err.stack)
    process.exit(1)
  }
});

