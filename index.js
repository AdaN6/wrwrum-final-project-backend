const express = require ('express');
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const cors = require("cors");
app.use(cors());


const port = process.env.PORT || 6000;

// --> connect to mongo
// const connectToDB = require("./DB/mongoConnection");



const newsRoutes = require("./routes/newsRoute")
app.use("/news", newsRoutes);

connectDB().then(() => {
  app.listen(port, () => console.log(`Server started on port ${port}`));
});
