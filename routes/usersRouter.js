const express = require('express');

const userRouter = express.Router();

const { loginUser, signupUser } = require ("../controllers/userControllers")

//login
userRouter.route("/login").post(loginUser);

userRouter.route("/signup").post(signupUser);

module.exports = userRouter;



