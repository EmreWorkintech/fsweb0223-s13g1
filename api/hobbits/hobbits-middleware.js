const { hobbits } = require('./hobbits-model');

function hobbitPayloadCheck(req,res,next){
    const payload = req.body;
    if(!payload.name || !(payload.name.trim().length >= 3) ) {
        next({status: 400, message: "name bilgisi eksik veya 3 karakterden az!..."})
    } else {
        next()
    }
}

const isHobbitValid = (req,res,next)=> {
    const id = req.params.id;
    const hobbit = hobbits.find(item=>item.id == id);

    if(!hobbit ) {
        next({status: 404, message: `${id}'li hobbit yok!...`});
    } else {
        next()
    }
}


module.exports = {
    hobbitPayloadCheck,
    isHobbitValid,
}