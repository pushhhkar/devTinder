const mongoose = require('mongoose');
const validator = require("validator");

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
    },
},
    {
       timestamp: true, 
    }
);

module.exports = mongoose.model("User", userSchema);