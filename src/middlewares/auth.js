const adminAuth =  (req,res, next)=>{
    const token = "xyz";
    const isAuthinticated = token ==="xyz";
    if(!isAuthinticated){
        res.status(481).send("unauthorized request");
    }else{
        next();
    }
};

module.exports = { adminAuth };