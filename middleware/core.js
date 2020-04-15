module.exports=function(req,res,next){
    if(req.user.position==='Core'){
        next();
    }
    else{
        res.send('You are not authorized');
    }
}