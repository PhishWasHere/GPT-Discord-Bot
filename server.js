require('dotenv').config();

const express = require('express')
const next = require('next')
const bodyParser  = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const port = process.env.PORT || 3000

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
    await nextApp.prepare()
    const app = express()

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