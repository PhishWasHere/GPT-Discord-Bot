require('dotenv').config();

const express = require('express')
const next = require('next')
const wssStart = require('./server/config/wss/index');
const bodyParser  = require('body-parser')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production' // boolian for dev mode
const nextApp = next({ dev }) // nextjs app
const handle = nextApp.getRequestHandler() // handler for nextjs app

const apiRoute = require('./server/routes/index'); 

const db = require('./server/config/mongo/index');
const {client, setWssInstance} = require('./server/config/discord/index');

const clientStart = () => {
  client.login(process.env.DISCORD_SK);
  client.once('ready', c => {
    console.log(`\x1b[35m> Ready!\x1b[0m Logged in as ${c.user.tag}`);
  }, 1000);

};

const start = async () => {
  try {
    await nextApp.prepare() // wait for next to be prepared
    const app = express() //then starts server

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/api', apiRoute);

    app.get('*', (req, res) => {
      return handle(req, res)
    })

   app.listen(port, () => {
     console.log(`\x1b[35m> Ready!\x1b[0m on http://localhost:${port}`);
   })

    const wss = wssStart();
    setWssInstance(wss);

    clientStart();
  } catch (err) {
    console.error(err.stack)
    process.exit(1)
  }
}

start();