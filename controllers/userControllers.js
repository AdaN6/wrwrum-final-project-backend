const User = require("../models/userModel");

// --> Login User

const loginUser = async (req, res) => {
    res.json({mssg: "login User"})
}

// --> Signup User

const signupUser = async (req, res) => {
    res.json({mssg: "sigup user"})
}

module.exports = { loginUser, signupUser };