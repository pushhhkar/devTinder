const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res)=>{
    const user = new User({
        firstName: "achin",
        lastName: "endulkar",
        emailId: "achin@endulkar.com",
        password: "achin@123"
    });

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



