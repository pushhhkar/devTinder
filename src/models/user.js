const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: " + value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong Password: " + value);
            }
        },
    },
    age: {
        type: Number,
        min: 16,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: `{VALUE} is not valid gender type`
        }
    },
    photoUrl: {
        type: String,
        default: "https://imgs.search.brave.com/mK9mB8Mxg7zIDdDsuzcxEAUuuDCr-5rFmHpFUM4x8ZE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y29tcHV0ZXJob3Bl/LmNvbS9qYXJnb24v/Zy9ndWVzdC11c2Vy/LnBuZw",
    },
    about: {
        type: String,
        default: "This is default about user"
    },
    skills: {
        type: [String],
        default: [],
    },
},
    {
       timestamp: true, 
    }
);

userSchema.methods.getJWT = async function (){
    const user = this;

    const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790",{
        expiresIn: "7d",
    });
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser, 
        passwordHash
    );

    return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);