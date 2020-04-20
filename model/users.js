const mongoose=require('mongoose');
const Joi=require('joi');
const config= require('config');

const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        // required:true,
        minlength:6
    },
    phone:{
        type:String,
        required:true,
        // unique:true,
        minlength:10
    },
    position:{
        type:String,
        required:true,
        enum :['Member','Core','EXBO'],
        default:'Member'
    },
    marks:{
        type:Array,
        default:[]
    }
});

// generate jwt
userSchema.methods.generateAuthToken=function()
{
    const token=jwt.sign({password:this.password,email:this.email,_id:this._id,position:this.position},config.get('privateKey'));
    return token;
}

const User=mongoose.model('User',userSchema);

function validateUser(user){
    const schema={
        name: Joi.string().min(5).required(),
        email: Joi.string().required().email(),
        phone: Joi.string().min(10).required(),
        password: Joi.string().min(6).required()
    }

    return Joi.validate(user,schema);
}

exports.User=User;
exports.validate=validateUser;