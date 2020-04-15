const express=require('express');
const mongoose=require('mongoose');
const {Message,validate}=require('../model/messages');

const auth=require('../middleware/auth');
const position=require('../middleware/position');
 
const router=express.Router();

// anyone authorised with position= core||exbo can post the message
router.post('/',[auth,position],async(req,res)=>{
    let message=new Message({
      subject: req.body.subject,
      statement:req.body.statement,
      to: req.body.to,
      from:req.user.position
  });
    message=await message.save();
    res.send(message);
});

// get all the messages
router.get('/',auth,async(req,res)=>{
  const messages=await Message.find().sort('date');
  res.send(messages);
});

// only the position who posted can change
router.put('/:id',auth,async(req,res)=>{
  let message= await Message.findById(req.params.id);
  if(message.from===req.user.position){
      message={
      subject: req.body.subject,
      statement:req.body.statement,
      to: req.body.to,
      from:req.user.position
      }
      message=await message.save();
      res.send(message);
 }
  else{
    res.send("You are not authorized");
  }
});

// only the position who posted it can delete it
router.delete('/:id',auth,async(req,res)=>{
  const message = await Message.findByIdAndRemove(req.params.id);
  res.send(message);
});

module.exports=router