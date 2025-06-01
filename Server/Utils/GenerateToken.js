const jwt = require("jsonwebtoken");

const GenerateToken = (id) => {
    if (!id) {
        throw new Error("ID is required to generate a token");
    }
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    return token;
}

module.exports = GenerateToken;