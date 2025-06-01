const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true,
        enum : ["Admin", "BaseCommander", "LogOfficer"]
    },
    image : {
        type: String,
        required: true
    },
    assignedBase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Base",
        required: function() {
            return this.role === "BaseCommander" || this.role === "LogOfficer";
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);
module.exports = User;