const router = require('express').Router();
const Northwind = require('./northwind-model');


router.get('/', async (req,res,next)=> {
    const result = await Northwind.getAll();
    res.json(result);
})

router.get('/:id', async (req,res,next)=> {

    const result = await Northwind.getById(req.params.id);
    res.json(result);
})

router.get('/search', async (req,res,next)=> {
    const filter = {};
    const { sortField, search} = req.query;
    filter[sortField] = search;

    const result = await Northwind.getByFilter(filter);
    res.json(result);
})

router.post('/', async (req,res,next)=> {
    const result = await Northwind.create(req.body);
    res.status(201).json(result);
})

router.put('/:id', async (req,res,next)=> {
    const result = await Northwind.update(req.body, req.params.id);
    res.json({message: `${result} rows affected`});
})

router.delete('/:id', async (req,res,next)=> {
    const result = await Northwind.remove(req.params.id);
    res.json({message: `${result} rows affected`});
})

module.exports = router;
