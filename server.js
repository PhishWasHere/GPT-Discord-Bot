require('dotenv').config();

const express = require('express')
const next = require('next')
const bodyParser  = require('body-parser')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production' // boolian for dev mode
const nextApp = next({ dev }) // nextjs app
const handle = nextApp.getRequestHandler()

const apiRoute = require('./server/routes/index'); 

const client = require('./server/config/index');

const clientStart = () => {
  client.login(process.env.DISCORD_SK);
  client.once('ready', c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
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
      console.log(`> Ready on http://localhost:${port}`)
    })
 
    clientStart();
  } catch (err) {
    console.error(err.stack)
    process.exit(1)
  }
}

start();