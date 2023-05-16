const router = require('express').Router();


//create
router.post('/:id', (req,res)=>{
    const newHobbit = {
        id: req.params.id
    }
    res.status(201).json(newHobbit);
})


module.exports = router;