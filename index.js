const express=require('express');
const mongoose=require('mongoose');

const app=express();

const user=require('./routes/user');
const message=require('./routes/message');
const auth=require('./routes/auth');

app.use(express.json());

app.use('/api/user',user);
app.use('/api/message',message);
app.use('/api/auth',auth)

mongoose.connect('mongodb://localhost/test')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=> console.error('Not Connected...'));

const port=process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on Port ${port}...`)); 