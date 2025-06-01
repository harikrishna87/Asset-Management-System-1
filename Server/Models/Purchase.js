const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
    base: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Base",
        required: true
    },
    equipmentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EquipmentType",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    supplier: {
        type: String
    },
    cost: {
        type: Number
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Purchase = mongoose.model("Purchase", PurchaseSchema);
module.exports = Purchase;