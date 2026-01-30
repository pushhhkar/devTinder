const express = require("express");

const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

profileRouter.get("/profile",userAuth, async (req, res)=>{
    try {
    const user = req.user;
    
    if(!user){
        throw new Error("user doen't exist");
    }

    res.send(user);
}catch(err){
    console.log(err);
        res.status(400).send("something went wrong");
    }
});

module.exports = profileRouter;