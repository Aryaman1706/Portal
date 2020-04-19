const nodemailer=require('nodemailer');
const express=require('express');
const mongoose=require('mongoose');
const {User}=require('../model/users');
const {Message}=require('../model/messages');
const Nexmo = require('nexmo');

const config= require('config');

async function sendMail(message)
{
    const users=await User.find({position:message.to});
     console.log(users);
     console.log(message);
    users.forEach(
        
      // NODEMAILER WORK
      async function (user) {
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                user: 'aryaman.17.06@gmail.com',
                pass: '5october'
              }
            });
          
            let info = await transporter.sendMail({
              from: 'aryaman.17.06@gmail.com', // sender address
              to: JSON.stringify(user.email), // list of receivers
              subject: message.subject , // Subject line
              text: message.statement, // plain text body
            //   html: "<b>Hello world?</b>" // html body
            });
          
            console.log("Message sent: %s", info.messageId);          
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          }
    )

}




module.exports=sendMail;
