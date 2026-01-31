const express = require("express");
const userRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", ["firstName", "LastName"]); 
        res.json({
            message: "Data fetched successfully",
            data: connectionRequest,
        });
    }catch (err) {
        req.statusCode(400).send("ERROR: " + err.message);
    }
});

module.exports = userRouter;