const Joi = require('joi');
const express=require('express');
const mongoose=require('mongoose');
const {User}=require('../model/users');

const router = express.Router();

router.post('/',async (req,res)=>
{
    let user = await User.findOne({ email: req.body.email });
    if(user.password!==req.body.password) return res.send('Not valid');
    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router; 