const cookieParser = require('cookie-parser')
const express = require('express')
require('dotenv').config()

const { createServer } = require('./create-server')

const { PORT } = process.env

const server = createServer()
const app = express()

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  },
  path: '/'
})

app.use(cookieParser())
// TODO: Add authorization middleware

app.listen({ port: PORT }, () => {
  const url = `http://localhost:${PORT}${server.graphqlPath}`

  console.log(`🚀 Server ready at ${url}`)
})
