module.exports=function(req,res,next){
    if(req.user.position==='EXBO'){
        next();
    }
    else{
        res.send('You are not authorized');
    }
}