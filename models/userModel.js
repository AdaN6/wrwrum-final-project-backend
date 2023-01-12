const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator")

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  country: {
    type: String,
  },
  favourtieDriver: {
    type: String,
  },
  favouriteTeam: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

// --> static signup method 

userSchema.statics.signup = async function (firstName, email, password) {
    // validation
    if ( !firstName || !email || !password) {
        throw Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough!");
    }


    // find existing email
    const exist = await this.findOne({ email });

    if (exist) {
        throw Error("Email already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ firstName, email, password: hash });

    return user;
    };


module.exports = mongoose.model("User", userSchema)