const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Employee = require('../northwind/northwind-model');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config/config');
let { jwtCache } = require('./auth-middleware')



//register
router.post('/register', async (req,res,next)=>{
    const { firstName, lastName, email, password } = req.body;
    //pasword hash
    const hashedPassword = bcrypt.hashSync(password, 8);
    //hashed password'lü bu kullanıcyı kaydettik.
    const newUser = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: hashedPassword
    }
    const registeredUser = await Employee.create(newUser);
    //status 201 created, kullanıcyı geri döndük.
    res.status(201).json(registeredUser);
})

//login
router.post('/login', async (req,res,next)=>{
    /* 
    {
        email: emre@wit.com.tr,
        password: 1234   //$2a$08$gGB73G42u2d0lV2s162Npef0FPLAdYuCoHD9xAyK/clGrJYnsy.eu
    }
    */
    const { email, password } = req.body
    //1. kullanıcyı email db'den alırız.
    const user = await Employee.getByFilter({Email: email}).first()
    if(user){
    //2. password check
        if(bcrypt.compareSync(password, user.Password )) {
                //3. session bilgiini döneriz.
                // ! session'ı iptal ettik.
                /* req.session.name = user.FirstName;
                req.session.email = user.Email;
                req.session.userId = user.Id; */


                // ? token oluşturuyoruz ve geri dönüyoruz.
                const generatedToken = generateToken(user);
                jwtCache.push(generatedToken);
                res.json({message: `Welcome back ${user.FirstName}...`, token: generatedToken})

        } else {
            res.status(400).json({message: "Invalid credentials!.."})
        }
    
    } else {
        res.status(400).json({message: "Invalid credentials!.."})
    }
   
})

//logout
router.get('/logout', (req,res,next)=>{
   
    // ! session için kaldırdık
    //session destroy metodunu kullanırız.
    /* if(req.session) {
        req.session.destroy(err=>{
            if(err){
                res.json({message: "Log out error!.."})
            } else {
                res.set('Set-Cookie', 
                        'LoR=; Path=/; Expires=Tue, 01 Jan 1970 09:39:35 GMT; HttpOnly')
                res.json({message: "Good Bye, come back soon..."})
            }
        })

    } else {
        res.json({message: "Not a valid session!.."})
    } */

     // ? token'a göre logout yapılacak
     /*
     1- token'ı headers'dan alırız.
     2- token varsa ve cache'de varsa
     3- cache'den silerim.
     */
    const token = req.headers.authorization;
    if(token){
        if(jwtCache.includes(token)) {
            jwtCache = jwtCache.filter((item)=> item!=token);
            res.json({message:"Gene bekleriz!..."})
        } else {
            next({status:400, message:"token is not valid!..."})
        }
    } else {
        next({status:400, message:"token is not provided!..."})
    }
    
})

//reset password
router.post('/password/reset', (req,res,next)=>{
    /*
    {email: emre@wit.com.tr}
    */

    //1. bu kulanıcı var mı?
    //2. token generate ederiz. (5 dakika geçerli olur ve tek kullanımlıktır)
    //3. token'ı magic link olarak emailde göndeririz.

})

function generateToken(user) {
    const payload = {
        userId: user.Id,
        name: user.FirstName,
        role: user.Role
    }

    const options = {
        expiresIn: 1*60*60*3  //"3h", "10800000"
    }

    const token = jwt.sign(payload, JWT_SECRET, options);
    return token;
}


module.exports = router;