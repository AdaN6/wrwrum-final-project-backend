const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// create token for signup user

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// --> Login User

const loginUser = async (req, res) => {
    res.json({mssg: "login User"})
}

// --> Signup User

const signupUser = async (req, res) => {
    const { firstName, email, password } = req.body;
    
    try{
        const user = await User.signup(firstName, email, password)

        const token = createToken(user._id);

        res.status(200).json({ firstName, email, token});
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser };