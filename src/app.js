const express = require('express');

const app = express();

const { adminAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res, next) =>{
    res.send("All Data Sent");
});

app.get("/admin/DeleteData", (req, res, next)=>{
    res.send("Deleted All Data");
});



app.listen(3000, () => {
    console.log("server is successfully listening on port 3000..");
});
