const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    country: {
        type: String
    },
    favourtieDriver: {
        type: String
    },
    favouriteTeam: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: Boolean
    }

})

module.exports = mongoose.model("User", userSchema)