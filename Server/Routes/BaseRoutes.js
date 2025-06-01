const express = require("express");
const {CreateBase, GetAllBases, GetBaseById, UpdateBase, DeleteBase} = require("../Controllers/BaseController.js");
const { Protect, Authorize } = require("../Middleware/AuthMiddleWare.js");

const router = express.Router();

router.post("/createbase", Protect, Authorize("Admin"), CreateBase);
router.get("/allbases", GetAllBases);
router.get("/base/:id", Protect, GetBaseById);
router.put("/updatebase/:id", Protect, Authorize("Admin"), UpdateBase);
router.delete("/deletebase/:id", Protect, Authorize("Admin"), DeleteBase);

module.exports = router;