const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

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

userRouter.get("/user/connections",userAuth, async(req, res)=>{
    try {
         const loggedInUser = req.user;

         const connectionRequest =  await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"},
            ],
         }).populate("fromUserId", ["firstName", "lastName"])
         .populate("toUserId", ["firstName", "lastName"]);

         const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
         });
         res.json({data});
    }catch(err){
        err.status(400).send({message: err.message});
    }
})

userRouter.get("/feed", userAuth, async (req, res) =>{
    //User should see all the user cards except
    // 0 his own card
    // 1 his connections
    // 2 ignored people
    // 3. already sent the connection request 
    try{
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit >50 ? 50 : limit;
    const skip = (page -1)*limit;
    // find all connection req (sent + received);
    const connectionRequests = await ConnectionRequest.find({
        $or: [{ fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}],
    }).select("fromUserId toUserId");


    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
        $and: [
            {_id: {$nin: Array.from(hideUsersFromFeed)}},
            {_id: {$ne: loggedInUser._id}},
        ],
    }).select("firstName lastName").skip(skip).limit(limit);
    res.send(users);
}catch(err){
    res.status(400).json({message: err.message});
}   
});

module.exports = userRouter;