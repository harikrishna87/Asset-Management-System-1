const EquipmentType = require("../Models/EquipmentType.js");

const CreateEquipmentType = async(req, res) => {
    try {
        const {name, category, image} = req.body;

        if(!name || !category) {
            return res.status(400).json({message: "Name and category are required."});
        }

        const EquipmentType_Already_Exists = await EquipmentType.findOne({name});

        if(EquipmentType_Already_Exists) {
            return res.status(400).json({message: "Equipment type with this name already exists."});
        } 

        const NewEquipmentType = await EquipmentType.create({
            name,
            category,
            image
        });
        res.status(201).json({message: "Equipment type created successfully.", NewEquipmentType});
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong: " + error.message});
    }
}

const GetAllEquipmentTypes = async(req, res) => {
    try {
        const EquipmentTypes = await EquipmentType.find({});
        res.status(200).json(EquipmentTypes);
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong: " + error.message});
    }
}

const GetEquipmentTypeById = async(req, res) => {
    try {
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: "Equipment type ID is required."});
        }

        const EquipmentTypeData = await EquipmentType.findById(id);
        if(EquipmentTypeData) {
            res.status(200).json(EquipmentTypeData);
        } else {
            res.status(404).json({message: "Equipment type not found."});
        }
    } catch(error) {
        res.status(500).json({message: "Something went wrong: " + error.message});
    }
}

const UpdateEquipmentType = async(req, res) => {
    try {
        const {name, category, image} = req.body;
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: "Equipment type ID is required."});
        }

        const UpdatedEquipmentType = await EquipmentType.findByIdAndUpdate(id, {
            name, 
            category,
            image
        }, {new: true});

        if(UpdatedEquipmentType) {
            res.status(200).json({message: "Equipment type updated successfully.", UpdatedEquipmentType});
        } else {
            res.status(404).json({message: "Equipment type not found."});
        }
    } catch(error) {
        res.status(500).json({message: "Something went wrong: " + error.message});
    }
}

const DeleteEquipmentType = async(req, res) => {
    try {
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: "Equipment type ID is required."});
        }

        const DeletedEquipmentType = await EquipmentType.findByIdAndDelete(id);

        if(DeletedEquipmentType) {
            res.status(200).json({message: "Equipment type deleted successfully."});
        } else {
            res.status(404).json({message: "Equipment type not found."});
        }
    } catch(error) {
        res.status(500).json({message: "Something went wrong: " + error.message});
    }
}

module.exports = {
    CreateEquipmentType,
    GetAllEquipmentTypes,
    GetEquipmentTypeById,
    UpdateEquipmentType,
    DeleteEquipmentType
};
