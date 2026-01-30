const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bycrpt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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



