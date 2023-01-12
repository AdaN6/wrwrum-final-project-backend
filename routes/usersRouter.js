const express = require('express');

const userRouter = express.Router();

const { getUsers, loginUser, signupUser, } = require ("../controllers/userControllers")

userRouter.route("/")
.get(getUsers)

//login
userRouter.route("/login")
.post(loginUser);


// signup
userRouter.route("/signup").post(signupUser);

module.exports = userRouter;



