const router = require('express').Router();
const Employee = require('./employee-model');

router.get('/order/count', async (req,res,next)=>{
    const result = await Employee.employeesOrderCount();
    res.json(result);
})

router.get('/order/', async (req,res,next)=>{
    const result = await Employee.employeesOrders();
    res.json(result);
})

module.exports = router;