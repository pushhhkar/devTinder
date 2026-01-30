const express = require("express");

const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");

profileRouter.get("/profile/view",userAuth, async (req, res)=>{
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

profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.send(`${loggedInUser.firstName}, your profile updated successfully`);
    }catch (err){
        res.status(400).send("ERROR :" + err.message);
    }
})

module.exports = profileRouter;