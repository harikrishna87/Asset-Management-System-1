const express = require("express");
const {RegisterUser, LoginUser, GetCurrentUser, GetAllUsers} = require("../Controllers/AuthController.js");
const {Protect, Authorize} = require("../Middleware/AuthMiddleWare.js");

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/currentuser", Protect, GetCurrentUser);
router.get("/allusers", Protect, Authorize("Admin"), GetAllUsers);

module.exports = router;