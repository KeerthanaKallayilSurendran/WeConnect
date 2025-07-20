require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require('./routes/auth.routes')
const passport = require('passport')
require('./config/connection')
require('./config/passport.google')

const smServer = express()
smServer.use(cors())
smServer.use(express.json())
smServer.use(passport.initialize());
smServer.use(router)
const PORT = process.env.PORT || 3000

smServer.listen(PORT, ()=>{
    console.log(`We Conncet server started at ${PORT}`);
})

smServer.get('/', (req,res)=>{
    res.status(200).send(`<h1>Welcome to WeConnect Server</h1>`)
})