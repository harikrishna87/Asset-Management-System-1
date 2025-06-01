const Base = require("../Models/Base.js");

const CreateBase = async(req, res) => {
    try {
        const {name, location, image} = req.body;

        if(!name || !location) {
            return res.status(400).json({message: "Name and location are required."});
        }
        const baseAlreadyExists = await Base.findOne({name});
        if(baseAlreadyExists) {
            return res.status(400).json({message: "Base with this name already exists."});
        }

        const newBase = await Base.create({
            name,
            location,
            image
        });
        res.status(201).json({message: "Base created successfully.", newBase});
    } catch(error) {
        res.status(500).json({message: "Something went wrong: " + error.message});
    }
};

const GetAllBases = async(req, res) => {
    try {
        const bases = await Base.find({});
        res.status(200).json(bases);
    } catch(error) {
        res.status(500).json({message: "Something went wrong: " + error.message});
    }
};

const GetBaseById = async(req, res) => {
    try {
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: "Base ID is required."});
        }

        const baseData = await Base.findById(id);
        if(baseData) {
            res.status(200).json(baseData);
        } else {
            res.status(404).json({message: "Base not found."});
        }
    } catch(error) {
        res.status(500).json({message: "Something went wrong: " + error.message});
    }
};

const UpdateBase = async(req, res) => {
    try {
        const {name, location, image} = req.body;
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: "Invalid Base ID format."});
        }

        if(!name || !location) {
            return res.status(400).json({message: "Name and location are required."});
        }

        const existingBaseWithSameName = await Base.findOne({ name, _id: { $ne: id } });
        if (existingBaseWithSameName) {
            return res.status(400).json({ message: "Another base with this name already exists." });
        }

        const baseData = await Base.findByIdAndUpdate(id, {
            name,
            location,
            image
        }, {new: true, runValidators: true});

        if(baseData) {
            res.status(200).json({
                message: "Base updated successfully.",
                baseData
            });
        } else {
            res.status(404).json({message: "Base not found."});
        }
    } catch(error) {
        res.status(500).json({message: "Something went wrong: " + error.message});
    }
};

const DeleteBase = async(req, res) => {
    try {
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: "Base ID is required."});
        }

        const baseData = await Base.findByIdAndDelete(id);
        if(baseData) {
            res.status(200).json({message: "Base deleted successfully."});
        } else {
            res.status(404).json({message: "Base not found."});
        }
    } catch(error) {
        res.status(500).json({message: "Something went wrong: " + error.message});
    }
};

module.exports = {
    CreateBase,
    GetAllBases,
    GetBaseById,
    UpdateBase,
    DeleteBase
};