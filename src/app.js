const express = require('express');

const app = express();



app.use("/user", (req, res)=>{
    throw new  Error("bsdk");
    res.send("fetched all data");
})

app.use("/", (err, req, res, next) =>{
    if(err){
        res.status(500).send("something went wrong");
    }
});



app.listen(3000, () => {
    console.log("server is successfully listening on port 3000..");
});
