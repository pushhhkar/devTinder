const express = require('express');

const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, (req, res)=>{
    try {
        res.send("Connection request established");
    }catch (err){
        res.status(400).send("something went wrong")
    }
})

module.exports = requestRouter;