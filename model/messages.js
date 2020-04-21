const mongoose=require('mongoose');
const Joi=require('joi');
const moment=require('moment');

const messageSchema= new mongoose.Schema({
    subject:{
        type: String,
        required:true,
    },
    statement:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:moment().format('lll')
    },
    to:{
        type:String,
        default:"Member",
        enum:["Member","Core","EXBO"]
    },
    from:{
        type:String,
        default:"Core",
        enum:["Core","EXBO"]
    }
});

const Message= mongoose.model('Message',messageSchema);

function validateMessage(message){
    const schema={
        subject: Joi.string().required(),
        statement: Joi.string().required(),
    }
    return Joi.validate(message,schema);
}

exports.Message=Message;
exports.validate=validateMessage;