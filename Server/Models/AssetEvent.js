const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: true,
        enum : ["Purchase", "Initial_Stock", "Adjustment"]
    },
    EquipmentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EquipmentType",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    base: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Base",
        required: true
    },
    eventDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

const AssetEvent = mongoose.model("AssetEvent", assetSchema);
module.exports = AssetEvent;