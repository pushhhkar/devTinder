const express = require("express");
const bcrypt = require("bcrypt");
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

profileRouter.patch("/profile/password/update",userAuth, async (req, res)=>{
    try {
        const { oldPassword, newPassword } = req.body;

        if(!oldPassword || !newPassword) {
            throw new Error("Both old and new Password are required");
        }
        const loggedInUser = req.user;
        const isMatch = await bcrypt.compare(oldPassword, loggedInUser.password);
        
        if(!isMatch){
            throw new Error("old password is incorrect");
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = passwordHash;
        await loggedInUser.save();
        res.send("Password updated successfully");
    }catch(err){
        res.status(400).send(err.message);
    }
});

module.exports = profileRouter;