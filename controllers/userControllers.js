const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// create token for signup user

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// --> Login User

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.json({email, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
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

// --> get all user
const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.json(users)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

// --> get one user

// const getUserById = async (req, res) => {
//     try{
//         const {id} = req.params;
//         const userById = await User.findById(id);
//         if (userById) return res.status(200).json(userById);
//         res.status(404).send('User not found')

//     } catch(error) {
//         res.status(500).send(error.message)
//     }
// }

const getUserEmail = async (req, res) => {
    const {email} = req.params
    try {
        const user = await User.email(email)

        res.status(200).json({user})

    } catch(error) {
        res.status(500).send(error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        // console.log(req.params)
        const { email } = req.params;

        const updateUser = await User.updateUserbyEmail (
          email,
          { ...req.body },
          { new: true }
        );
        // const token = createToken(updateUser);


        res.status(200).json(updateUser);


    }catch(error){
        res.status(500).send(error.message)

    }
}


module.exports = { loginUser, signupUser, getUsers, getUserEmail, updateUser };