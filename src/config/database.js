const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
       "mongodb+srv://2003pushkarkumar_db_user:Ng558iwV9mNhiTZy@namastedev.ma09ifv.mongodb.net/devTinder"
    );
};

module.exports = connectDB;

