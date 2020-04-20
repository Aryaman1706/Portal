const express=require('express');
const mongoose=require('mongoose');
const {Message,validate}=require('../model/messages');
const sendMail=require('../functions/sendMail');
const sendText=require('../functions/sendText');

const auth=require('../middleware/auth');
const position=require('../middleware/position');
 
const router=express.Router();


// get all the for my position messages
router.get('/',auth,async(req,res)=>{
  const messages=await Message.find({to:req.user.position}).sort('-date');
  res.send(messages);
});


// anyone authorised with position= core||exbo can post the message
router.post('/',[auth,position],async(req,res)=>{
    let message=new Message({
      subject: req.body.subject,
      statement:req.body.statement,
      to: req.body.to,
      from:req.user.position
  });
    message=await message.save();

    // send mail via nodemailer
    sendMail(message);

    // send text via nexmo
    sendText(message);        
    
    res.send(message);
});



// only the position who posted can change
router.put('/:id',auth,async(req,res)=>{
  let message= await Message.findById(req.params.id);
  if(message.from!==req.user.position){
    res.send("you are not authourized");
  }
  else{
  message= await Message.findByIdAndUpdate((req.params.id),{
      subject: req.body.subject,
      statement:req.body.statement,
      to: req.body.to,
      from:req.user.position
  },{new:true});
  
      res.send(message);
}
});

// only the position who posted it can delete it
router.delete('/:id',auth,async(req,res)=>{
  let message=await Message.findById(req.params.id);
  if(message.from!==req.user.position){
    res.send("You are not authorized");
  }
  else{ 
    message = await Message.findByIdAndRemove(req.params.id);
    res.send(message);
  }
  
});

module.exports=router