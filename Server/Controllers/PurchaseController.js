const Purchase = require("../Models/Purchase.js")
const EquipmentType = require("../Models/EquipmentType.js");
const Base = require("../Models/Base.js");
const AssetEventType = require("../Models/AssetEvent.js");


const CreatePurchase = async(req, res) => {
    try {
        const {baseId, equipmentTypeId, quantity, description, supplier, cost} = req.body;

        if(!baseId || !equipmentTypeId || !quantity || !description || !supplier || !cost) {
            res.status(400).json({message: "All fields are required."});
        }

        const Base_Already_Exists = await Base.findById(baseId);
        if(!Base_Already_Exists) {
            return res.status(400).json({message: "Base does not exist."});
        }

        const EquipmentType_Already_Exists = await EquipmentType.findById(equipmentTypeId);
        if(!EquipmentType_Already_Exists) {
            return res.status(400).json({message: "Equipment type does not exist."});
        }

        const NewPurchase = await Purchase.create({
            base: baseId,
            equipmentType: equipmentTypeId,
            quantity,
            description,
            supplier,
            cost,
            recordedBy: req.user._id,
            purchaseDate: Date.now()
        })

        if(NewPurchase) {
            const AssetEvent = await AssetEventType.create({
                eventType: "Purchase",
                EquipmentType: equipmentTypeId,
                quantity,
                base: baseId,
                description,
                eventDate: NewPurchase.purchaseDate,
                recordedBy: req.user._id
            });

            res.status(201).json({
                message: "Purchase created successfully.",
                purchase: NewPurchase,
                assetEvent: AssetEvent
            });
        } else {
            res.status(400).json({message: "Purchase creation failed."});
        }
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong: " + error.message});
    }
}

const GetAllPurchases = async(req, res) => {
    try {
        const Purchases = await Purchase.find({}).populate("base equipmentType recordedBy");
        res.status(200).json(Purchases);
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong: " + error.message});
    }
}

module.exports = {
    CreatePurchase,
    GetAllPurchases
}