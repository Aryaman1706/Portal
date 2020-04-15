const express=require('express');
const mongoose=require('mongoose');
const { User,validate,userSchema}=require('../model/users');

const router=express.Router();

router.get('/:id',async (req,res)=>{
    const user= await User.findById(req.params.id);
    if(!user) res.status(404).send('Not found');
    res.send(user);
});

router.post('/',async(req,res)=>{
    let user=new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        position: req.body.position
    });
    
    user=await user.save();
    res.send(user);
});

router.put('/addmarks/:id',async(req,res)=>{
    let user= await User.findById(req.params.id);
    user.marks.push(req.body.marks);
    user=await user.save();
    res.send(user);
});

router.put('/editmarks/:id',async(req,res)=>{
    let user= await User.findById(req.params.id);
    user.marks[user.marks.length-1]=req.body.marks;
    user=await user.save();
    res.send(user);
});

module.exports=router;