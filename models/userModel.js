const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator")

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

// static signup methode 

userSchema.static.signup = async (email, password) => {
    const exist = await this.findOne({email})

    if (exist) {
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash});

    return user;
}

module.exports = mongoose.model("User", userSchema)