const User = require("../Models/Users.js");
const Base = require("../Models/Base.js");
const GenerateToken = require("../Utils/GenerateToken.js");
const bcrypt = require("bcrypt");

const RegisterUser = async (req, res) => {
    try {
        const { username, password, role, image, assignedBaseId } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ message: "Username, password, and role are required." });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }

        let AssignedBase;

        if (role === "Admin") {
            if (assignedBaseId) {
                console.warn("Admin role does not require an assigned base. 'assignedBaseId' will be ignored.");
            }
            AssignedBase = undefined;
        } else if (role === "BaseCommander" || role === "LogOfficer") {
            if (!assignedBaseId) {
                return res.status(400).json({ message: `Assigned base ID is required for role '${role}'.` });
            }
            const baseExists = await Base.findById(assignedBaseId);
            if (!baseExists) {
                return res.status(400).json({ message: "Assigned base ID refers to a non-existent base." });
            }
            AssignedBase = baseExists._id;
        } else {
            return res.status(400).json({ message: `Invalid role '${role}' specified.` });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            role,
            image,
            assignedBase: AssignedBase,
        });

        return res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            role: newUser.role,
            assignedBase: newUser.assignedBase,
            token: GenerateToken(newUser._id),
        });

    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong during registration." });
    }
};

const LoginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const userExists = await User.findOne({ username }).populate("assignedBase");

        if (userExists && (await bcrypt.compare(password, userExists.password))) {
            return res.status(200).json({
                _id: userExists._id,
                username: userExists.username,
                role: userExists.role,
                image : userExists.image,
                assignedBase: userExists.assignedBase,
                token: GenerateToken(userExists._id),
            });
        } else {
            return res.status(401).json({ message: "Invalid username or password." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong during login." });
    }
};

const GetCurrentUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user data not found."});
    }
    return res.status(200).json({
        message: "User retrieved successfully.",
        user: req.user,
    });
};

const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("assignedBase").select("-password");
        
        if (users && users.length > 0) {
            return res.status(200).json({
                message: "Users retrieved successfully.",
                users: users,
            });
        } else {
            return res.status(404).json({ message: "No users found." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong while fetching users." });
    }
};

module.exports = {
    RegisterUser,
    LoginUser,
    GetCurrentUser,
    GetAllUsers,
};