const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://2003pushkarkumar_db_user:STUowNLy7P90LGT0@namastedev.ma09ifv.mongodb.net/devTinder"
    );
};

module.exports = connectDB;

