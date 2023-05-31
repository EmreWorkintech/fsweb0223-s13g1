const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config/config');

let loggedUsers = [];
let jwtCache = [];

function logger(req,res,next){
    console.log(`${new Date().toISOString()} ${req.method} to ${req.url} from origin ${req.get('origin')}`);
    next();
}

function loginPayloadCheck(req,res,next){
    const { name, password } =  req.query;
    if(name && name.trim().length > 3 && password && password.trim().length > 3 ) {
        next();
    } else {
        res.status(400).json({message: "name veya password bilgisi eksik!..."})
    }
}

function passwordCheck(req,res,next){
    const { password } = req.query;
    if (password == "fsweb0223") {
        loggedUsers.push(req.ip)
        next();
    } else {
        next({status: 400, message: "Invalid credentials!.."})
    }
}

function restricted(req,res,next){
    try{
      /*   if (loggedUsers.includes(req.ip)) {
            console.log(`Welcome back ${req.ip}!..`);
            next();
        } else {
            res.status(401).json({message: "Unauthorized access!.."})
        } */
        
        // ! session'ı kaldırdık
        /* if(req.session && req.session.email) {
            next()
        } else {
            res.status(401).json({message:"You need to login first!..."})
        } */

        // ? token'a göre kontrol     
        const token = req.headers.authorization;

        if(token && jwtCache.includes(token)) {
            jwt.verify(token, JWT_SECRET, (err,decoded)=>{
                if(err){
                    //hata dön
                    next({status:401, message:"token is not valid!..."})
                } else {
                    // decoded bilgiyi req'in içine koymalıyız.
                    req.decodedJWT = decoded;
                    next()
                }
            })
        } else {
            next({status:400, message:"token is not provided or valid!..."})
        }
        
           
    } catch (err) {
        next(err)
    }
;
    
}

const checkrole = (role) => (req,res,next)=>{
    if(role == req.decodedJWT.role) {
        next()
    } else {
        next({status:403, message: "You are not authorized for this service!..."})
    }
}

module.exports = {
    logger,
    loginPayloadCheck,
    passwordCheck,
    restricted,
    jwtCache,
    checkrole,
}