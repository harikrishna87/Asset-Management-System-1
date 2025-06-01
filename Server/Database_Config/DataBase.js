const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const MongoDB_URI = process.env.MONGODB_URI

if(!MongoDB_URI) {
    console.error("MongoDB URI is not defined in the environment variables.");
}

const ConnectDB = async() => {
    try {
        await mongoose.connect(MongoDB_URI);
        console.log("MongoDB Connected Successfully...")
    }
    catch(error) {
        console.error("MongoDB Connection Failed:", error.message);
    }
}

module.exports = ConnectDB;