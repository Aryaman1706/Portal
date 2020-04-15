const express=require('express');
const mongoose=require('mongoose');
const {Message,validate}=require('../model/messages');

const auth=require('../middleware/auth');
const Core=require('../middleware/core');
const EXBO=require('../middleware/exbo');
 
const router=express.Router();

router.post('/',auth,Core,async(req,res)=>{
    let message=new Message({
      subject: req.body.subject,
      statement:req.body.statement,
      userCategory: req.body.userCategory  
    });
    message=await message.save();
    res.send(message);
});

router.get('/',async(req,res)=>{
  const messages=await Message.find().sort('date');
  res.send(messages);
});

router.put('/:id',auth,Core,EXBO,async(req,res)=>{
  const message=await Message.findByIdAndUpdate((req.params.id),({
    subject: req.body.subject,
    statement:req.body.statement,
  }),{new:true});

  res.send(message);
});

router.delete('/:id',auth,Core,EXBO,async(req,res)=>{
  const message = await Message.findByIdAndRemove(req.params.id);
  res.send(message);
});

module.exports=router;