require('dotenv').config();

const express = require('express')
const bodyParser  = require('body-parser')

const port = process.env.PORT || 3001

const route = require('./routes'); 

const db = require('./config/mongo/index'); //idk how the db is connected to the server, but it is
const {client} = require('./config/discord/index');

const clientStart = () => {
  client.login(process.env.DISCORD_TOKEN);
  client.once('ready', c => {
    console.log(`\x1b[35m> Ready!\x1b[0m Logged in as ${c.user.tag}`);
  }, 1000);

};

db.once('open', async () => {
  try {
    const app = express() 

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/', route);

    app.listen(port, () => {
      console.log(`\x1b[35m> Ready!\x1b[0m on http://localhost:${port}`);
    })

    clientStart();
  } catch (err) {
    console.error(err.stack)
    process.exit(1)
  }
});

