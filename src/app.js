const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.get("/user", async (req, res) =>{
    const userEmail = req.body.emailId;

    try {
        const users = await User.find({emailId: userEmail});
        if(!users){
            res.status(404).send("user not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("something went wrong");
    }
});

app.get("/feed", async (req, res)=>{
    try {
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Sonething went wrong")
    }
})

app.delete("/user", async (req, res)=>{
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);

        res.send("user deleted succesfully");
    }catch (err) {
        res.status(400).send("Something went wrong");
    }
})

/*app.patch("/user", async (req, res)=>{
    const userId = req.body.userId;
    const data =  req.body;

    try {
        const user = await User.findByIdAndUpdate({_id: userId}, data);
        res.send("user updated successfully");
    }catch (err){
        res.status(400).send("something went wrong");
    }
});*/

app.patch("/user", async (req, res)=>{
    const emailId = req.body.emailId;
    const data = req.body;

    const updates = Object.keys(req.body).filter(
        key => key !== "emailId"
    );

    const allowedUpdates = ["skills", "userId"];

    const isAllowed = updates.every((k)=>
        allowedUpdates.includes(k)
    );

    if(!isAllowed){
        res.status(400).send("Invalid update field");
    }

    try{
        const updatedUser = await User.findOneAndUpdate(
            {emailId: emailId}, 
            {$set: data},
            {new: true, runValidators: true},
        );
        if(!updatedUser){
            return res.status(404).send("user not found");
        }
        res.send("user updated succesfully");
    }catch (err) {
        res.status(400).send("something went wrong");
    }
});

app.post("/signup", async (req, res)=>{
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User Added Successfully");
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
});

connectDB()
    .then(()=>{
        console.log("Database connection established..");
        app.listen(3000, () => {
        console.log("server is successfully listening on port 3000..");
        });
    })
    .catch((err) => {
        console.log("database cannot be connected");
    });



