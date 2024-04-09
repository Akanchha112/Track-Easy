const jwt=require('jsonwebtoken');
function usermiddleware(req,res,next){
    // const username=req.headers.username;
    // const password=req.headers.password;
    const token = req.headers.authorization;
    const tok=token.split(" ");
    const response=jwt.verify(tok[1],'secretkey');
    if(!response){
        res.status(403).json({msg:"USer not logger in"});
    }else{
        req.user=response;
        next();
    }

}
module.exports=usermiddleware;