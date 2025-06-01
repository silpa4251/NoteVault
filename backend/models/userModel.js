const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            default: null,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
