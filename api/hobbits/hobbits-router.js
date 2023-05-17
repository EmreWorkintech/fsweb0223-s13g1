const router = require('express').Router();
const racesRouter = require('../races/races-router');
const hobbitMd = require('./hobbits-middleware');
let { hobbits, getId } = require('./hobbits-model');


//Read
router.get('/', (req,res,next)=>{

    const sortField = req.query.sortField || 'id';
    const sorted = hobbits.sort((a,b)=>{
        return a[sortField] < b[sortField] ? -1 : 1
    })

    const page= Number(req.query.page) || 1;
    const per_page = Number(req.query.per_page) || 3;


    const start = (page - 1)*per_page || 0 ;
    const end = (start + per_page);

    const result = sorted.slice(start,end);
    const response = {
        meta: {
            total: hobbits.length,
            per_page: per_page,
            page: page,
            start: start,
            end: end - 1,
            sortField: sortField,
            total_pages: Math.ceil(hobbits.length/per_page)
        },
        data: result
    }

    res.json(response);
})

router.get('/:id/:name/:surname', (req,res,next)=>{
    const hobbit = hobbits.filter(hobbit=>hobbit.id == req.params.id);  //req.params = {id: "34", name:"emre", surname: "şahiner"}
    res.json(hobbit[0]);
})

//create
router.post('/', hobbitMd.hobbitPayloadCheck, (req,res,next)=>{
    const newHobbit = {
        id: getId(),
        name: req.body.name
    }
    hobbits.push(newHobbit);
    res.status(201).json(newHobbit);
})

//update
router.put('/:id', hobbitMd.hobbitPayloadCheck, hobbitMd.isHobbitValid, (req,res,next)=>{
    hobbits = hobbits.map(hobbit=> {
        if (hobbit.id == req.params.id){
            return {
                id: hobbit.id,
                name: req.body.name
            }
        } else {
            return hobbit
        }
       }); 
    res.json(hobbits);
})

//delete 
router.delete('/:id', hobbitMd.isHobbitValid, (req,res,next)=>{
    try {
        let hobbit = hobbits.find(hobbit=>hobbit.id == req.params.id);

        if(!hobbit) {
            res.status(404).json({message:"Hobbit not found"});
        } else {
            hobbits = hobbits.reduce((total,item)=> {
                if (item.id == req.params.id){
                    return total
                } else {
                    total.push(item);
                    return total
                }
               },[]); 
        
            
            res.json(hobbits);
        }
    } catch(err) {
        next(err);
    }
    
})

router.use('/races', racesRouter);

module.exports = router;