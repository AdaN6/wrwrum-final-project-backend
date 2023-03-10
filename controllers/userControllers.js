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

        res.json({
          type: "success",
          message: "you are successfully logged in",
          token: token
        });
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

// --> Signup User

const signupUser = async (req, res) => {
    
    try{
        console.log(req.body)
        const { firstName, email, password } = req.body;
        const user = await User.signup(firstName, email, password)

        const token = createToken(user._id);

        res.status(200).json({token});
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// --> get all user
const getUsers = async (req, res) => {
    try{
        // only server an user back after running a token verification middleware!
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

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    // const findUser = await User.findById(id)
    // const user = await User.email(email)
    // console.log(user)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
    try {
        // console.log(req.params)
        // const { email} = req.params;

        const updateUser = await User.updateUserbyId (
          req.userId,
          { ...req.body },
          { new: true }
        );

        res.status(200).json(updateUser);

    }catch(error){
        res.status(500).send(error.message)

    }
}


module.exports = { loginUser, signupUser, getUsers, getUserById, updateUser };