// 1- importlarım
const express = require('express');
const server = express();
const hobbitsRouter = require('./hobbits/hobbits-router');
const authMd = require('./auth/auth-middleware');

// 2- global middleware'lar
server.use(express.json());
server.use(authMd.logger); //globalde middleware ekledik


// 3- Router'lar
server.use('/api/hobbits', authMd.restricted, hobbitsRouter);


// 4- Endpointler
server.get('/', (req,res,next)=>{
    res.send('Server is up and running!...')
})

server.get('/login', 
                authMd.loginPayloadCheck, 
                authMd.passwordCheck, 
                (req,res,next)=>{
    res.send(`Welcome back ${req.query.name}!...`)
})

// 5- error-handling middleware
server.use((err,req,res,next)=>{
    res
        .status(err.status || 500)
        .json({message: err.message || "Server error!.."})
})

module.exports = server;