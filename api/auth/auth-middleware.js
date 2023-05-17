let loggedUsers = [];


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
        if (loggedUsers.includes(req.ip)) {
            console.log(`Welcome back ${req.ip}!..`);
            next();
        } else {
            res.status(401).json({message: "Unauthorized access!.."})
        }
    } catch (err) {
        next(err)
    }
;
    
}

module.exports = {
    logger,
    loginPayloadCheck,
    passwordCheck,
    restricted,
}