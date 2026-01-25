const express = require('express');

const app = express();

// This will only handle GET call to /user
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    
    res.send({firstname: "Pushkar", lastname: "Kumar"});
});

app.post("/user", (req, res)=>{
    //saving data to database
    res.send("data saved successfully");
})

app.delete("/user", (req, res)=>{
    res.send("data deleted succesfully");
})



//this will match all the HTTP method API calls to /teset
app.use("/test",(req, res) => {
    res.send("Hello from server");
});



app.listen(3000, () => {
    console.log("server is successfully listening on port 3000..");
});
