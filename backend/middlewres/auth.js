const CustomError = require("../utils/customError");
const { verifyToken } = require("../utils/jwt");

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new CustomError("No token, authorization denied", 401);
        }

        const decoded = verifyToken(token);
            req.user = decoded;
            next();
    } catch (error) {
        next(new CustomError(error.message || "Authentication failed", 401));
    }
};

module.exports = auth;
