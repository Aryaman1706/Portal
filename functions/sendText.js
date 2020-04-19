const express=require('express');
const mongoose=require('mongoose');
const {User}=require('../model/users');
const {Message}=require('../model/messages');
const Nexmo = require('nexmo')

async function sendText(message){

    const nexmo = new Nexmo({
      apiKey: '042eafa6',
      apiSecret: 'NlJetIIJ2cUX3RmW',
    });
    
    const from = 'Society';
  
    const users=await User.find({position:message.to});
    users.forEach(
       function(user){
        const to = user.phone;
        const text = message.statement;
    
        nexmo.message.sendSms(from, to, text);
       }
    )
  }

  module.exports=sendText;