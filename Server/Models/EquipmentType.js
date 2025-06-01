const mongoose = require("mongoose");

const EquipmentTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Weapon", "Vehicle", "Ammunition", "General"]
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const EquipmentType = mongoose.model("EquipmentType", EquipmentTypeSchema);
module.exports = EquipmentType;