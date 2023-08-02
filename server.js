require('dotenv').config();

const express = require('express')
const next = require('next')
const WebSocket = require('ws')
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
    console.log(`\x1b[34m> Ready! Logged in as ${c.user.tag} \x1b[0m`);
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
      console.log(`\x1b[35m> Ready on http://localhost:${port} \x1b[0m`);
    })

    const wss = new WebSocket.Server({ port: 8080 });
    wss.on('connection', (ws) => {
      console.log('\x1b[33m> Client connected \x1b[0m');

      setInterval(() => {
        const data = {message: 'Hello from server'};
        ws.send(JSON.stringify(data));
      }, 5000);

      ws.on('message', (message) => {
        console.log(`\x1b[33m> Received message => ${message} \x1b[0m`);
      });

      ws.on('close', () => {
        console.log('\x1b[33m> Client disconnected \x1b[0m');
      });
   });
 
    clientStart();
  } catch (err) {
    console.error(err.stack)
    process.exit(1)
  }
}

start();