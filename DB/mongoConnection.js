const mongoose = require('mongoose');

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGO_OPENURI),
      () => console.log("Connected to MongoDB");
}

module.exports = connectToDB
