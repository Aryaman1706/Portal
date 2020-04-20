const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const passportSetup = require('./config/passport-setup');

const app=express();

const user=require('./routes/user');
const message=require('./routes/message');
const auth=require('./routes/auth');
const authGoogle=require('./routes/auth-google')

// MIDDLEWARE   

app.use(express.json());

// initialize passport
app.use(passport.initialize());


app.use('/api/user',user);
app.use('/api/message',message);
app.use('/api/auth',auth);
app.use('/api/auth/google',authGoogle);

mongoose.connect('mongodb://localhost/test')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=> console.error('Not Connected...'));

const port=process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on Port ${port}...`)); 