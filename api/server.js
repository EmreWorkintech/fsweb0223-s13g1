const express = require('express');
const server = express();
const hobbitsRouter = require('./hobbits/hobbits-router');


server.use(express.json());

server.use('/api/hobbits', hobbitsRouter);

server.get('/', (req,res)=>{
    res.send('Server is up and running!...')
})



module.exports = server;