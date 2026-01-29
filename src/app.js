const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require('./utils/validation');
const bycrpt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

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
    try {
    // validation of data
    validateSignUpData(req);
    const {firstName, lastName, emailId, password} = req.body;
    // Encrypt the password
    const passwordHash = await bycrpt.hash(password, 10);

    // creating new instance of the User model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });

    
        await user.save();
        res.send("User Added Successfully");
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
});

app.post("/login", async(req, res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Email Id");
        }
        const isPasswordValid = await bycrpt.compare(password, user.password);

        if(isPasswordValid){
            // create a JWT token
            const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790");
            console.log(token);

            // Add the token to a cookie and send back to the user
            res.cookie("token", token);
            res.send("Login Successful!");
        }else{
            throw new Error("password not correct");
        }
    }catch (err){
        res.status(400).send("ERROR : " + err.message);
    }
});

app.get("/profile", async (req, res)=>{
    try {const cookies = req.cookies;
    // console.log("Token", token);
    const { token } = cookies;

    if(!token){
        throw new Error("Invalid token");
    }
    
    const decodedMessage =  await jwt.verify(token, "DEV@Tinder$790");

    const { _id} = decodedMessage;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("user doen't exist");
    }

    res.send(user);
}catch(err){
    console.log(err);
        res.status(400).send("something went wrong");
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



