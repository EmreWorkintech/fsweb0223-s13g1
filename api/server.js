const express = require('express');
const server = express();

let id = 0;

function getId() {
    return ++id;
}
let hobbits = [
    {
        id: getId(),
        name: "Sam"
    },
    {
        id: getId(),
        name: "Merry"
    },
]

server.use(express.json());

server.get('/', (req,res)=>{
    res.send('Server is up and running!...')
})

//Read
server.get('/hobbits', (req,res)=>{
    res.json(hobbits);
})

//create
server.post('/hobbits', (req,res)=>{
    const newHobbit = {
        id: getId(),
        name: req.body.name
    }
    hobbits.push(newHobbit);
    res.status(201).json(newHobbit);
})

//update
server.put('/hobbits/:id', (req,res)=>{
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
server.delete('/hobbits/:id', (req,res)=>{

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
})

module.exports = server;