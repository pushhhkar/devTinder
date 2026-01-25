const express = require('express');

const app = express();

app.use("/user", (req, res, next)=>{
   // res.send("response1");
    next();
}, (req, res, next) =>{
    //res.send("response2")
    next();
}, (req,res, next)=>{
    res.send("3response");
}
);



app.listen(3000, () => {
    console.log("server is successfully listening on port 3000..");
});
