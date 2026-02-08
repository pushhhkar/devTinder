const express = require('express');
const connectDB = require("./config/database");
require("dotenv").config();
const app = express();
const User = require("./models/user");
const bycrpt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(cors({
    origin: [process.env.FRONTEND_URL,
    process.env.FRONTEND_URL],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
    .then(()=>{
        console.log("Database connection established..");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
        console.log("server is successfully listening...");
        });
    })
    .catch((err) => {
        console.log("database cannot be connected");
    });



