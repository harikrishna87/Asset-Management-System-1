const jwt = require("jsonwebtoken");
const User = require("../Models/Users.js");

const Protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password").populate("assignedBase");

            if (!req.user) {
                return res.status(401).json({ message: "Not authorized, user not found for token." });
            }
            next();
            return;
        } catch (error) {
            return res.status(500).json({ message: "Server error during authentication." });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token provided." });
    }
};

const Authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role ${req.user ? req.user.role : 'Unknown'} is not allowed to access this resource.` });
        }
        next();
    };
};

const BaseSpecific = (req, res, next) => {
    if (req.user.role === "BaseCommander" || req.user.role === "LogOfficer") {
        if (!req.user.assignedBase) {
             return res.status(403).json({ message: "User is not assigned to a base." });
        }
        const targetBaseId = req.params.baseId || req.body.base || req.body.baseId || req.query.baseId;
        if (targetBaseId && req.user.assignedBase._id.toString() !== targetBaseId.toString()) {
            return res.status(403).json({ message: "You do not have permission to access data for this base." });
        }
    }
    next();
};

module.exports = {
    Protect,
    Authorize,
    BaseSpecific
};