require('dotenv').config()

const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser')
const cors = require('cors')


const db = require('./config/bd');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)

app.use(cors({
    credentials: true,
    origin: process.env.CORS_URI
  }))
app.use(bodyParser.json())
app.use(express.json())

app.io = io;

consign({cwd: 'src'})
    .then('./api')
    .then('./config/routes.js')
    .into(app)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

server.listen(process.env.PORT || 4000,()=>{
    console.log('Backend executando...')
})

