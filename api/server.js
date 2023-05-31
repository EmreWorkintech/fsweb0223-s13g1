// 1- importlarım
const express = require('express');
const server = express();

// ! session yerine jwt kullanmaya geçtik.
//const session = require('express-session');
//const Store = require('connect-session-knex')(session);

const hobbitsRouter = require('./hobbits/hobbits-router');
const nwRouter = require('./northwind/northwind-router');
const authRouter = require('./auth/auth-router');
const authMd = require('./auth/auth-middleware');

// 2- global middleware'lar
//TODO-session'ı md'den çıkar

// ! session'ı iptal edince comment out ettik.
/* server.use(session({
    name: 'LoR',
    secret: 'buraya güvenli bir secret yazmak lazım, hatta bunu configden almak lazım',
    cookie: {
        maxAge: 1000*60*60*24*1, //1 gün geçerli olacak
        secure: false,  //prod'da true yapmak lazım. böylece sadece https üzerinden çalışacak 
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    store: new Store({
        knex: require('../data/db-config'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000*60*60
    })
})) */
server.use(express.json());
server.use(authMd.logger); //globalde middleware ekledik


// 3- Router'lar
server.use('/api/hobbits', authMd.restricted, authMd.checkrole("Admin"), hobbitsRouter);
server.use('/api/northwind', nwRouter);
server.use('/api/auth', authRouter);

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