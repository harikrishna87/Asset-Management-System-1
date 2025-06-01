const mongoose = require("mongoose");

const BaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const Base = mongoose.model("Base", BaseSchema);
module.exports = Base;