const mongoose=require('mongoose');
const Joi=require('joi');

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
        type:Date,
        default:Date.now
    },
    userCategory:{
        type:String,
        default:"Member",
        enum:["Member","Core","EXBO"]
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