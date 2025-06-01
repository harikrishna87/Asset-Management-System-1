const express = require("express");
const {CreateEquipmentType, GetAllEquipmentTypes, GetEquipmentTypeById, UpdateEquipmentType, DeleteEquipmentType} = require("../Controllers/EquipmentTypeController.js");
const {Protect, Authorize} = require("../Middleware/AuthMiddleWare.js");

const router = express.Router();

router.post("/createequipmenttype", Protect, Authorize("Admin"), CreateEquipmentType);
router.get("/allequipmenttypes", Protect, GetAllEquipmentTypes);
router.get("/equipmenttype/:id", Protect, GetEquipmentTypeById);
router.put("/updateequipmenttype/:id", Protect, Authorize("Admin"), UpdateEquipmentType);
router.delete("/deleteequipmenttype/:id", Protect, Authorize("Admin"), DeleteEquipmentType);

module.exports = router;