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



