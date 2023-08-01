require('dotenv').config();

const express = require('express')
const next = require('next')
const bodyParser  = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const port = process.env.PORT || 3000

const apiRoute = require('./routes/index'); 

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

    app.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
 
  } catch (err) {
    console.error(ex.stack)
    process.exit(1)
  }
}

start();