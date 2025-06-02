const express = require("express");
const { CreatePurchase, GetAllPurchases}  = require("../Controllers/PurchaseController.js");
const { Protect, Authorize } = require("../Middleware/AuthMiddleWare.js");

const router = express.Router();

router.post("/createpurchase", Protect, Authorize("Admin"), CreatePurchase);
router.get("/allpurchases", Protect, Authorize("Admin", "LogOfficer", "BaseCommander"), GetAllPurchases);

module.exports = router;