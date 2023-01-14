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
    default:""

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
  active: {
    type: Boolean,
    default: true,
  },
});

// --> statics signup method 

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

// --> statics login method 

userSchema.statics.login = async function(email, password){
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({email});

    if (!user) {
        throw Error("Incorrect Email")
    }

    console.log(password, user.password)
    const match = await bcrypt.compare(password, user.password)
    console.log(match)

    if (!match){
        throw Error('Incorrect password')
    }


    return user
}

// --> statics for email

userSchema.statics.email= async function (email) {
  // validation
  

  const user = await this.findOne({email})

  if (!user) {
    throw Error("User does not exist");
  }
  return user;
}

// --> static for update with email
userSchema.statics.updateUserbyEmail = async function (email, reqBody) {
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User does not exist");
  }

  const idOfUser = user._id;

 const salt = await bcrypt.genSalt(10);
 const hash = await bcrypt.hashSync(user.password, salt);


  const findId = await this.findByIdAndUpdate(idOfUser, {...reqBody, password: hash
  });

  console.log(findId);

  return findId;
}


module.exports = mongoose.model("User", userSchema)