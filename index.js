const express = require ('express');
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 6000;

// --> connect to mongo
const connectToDB = require("./DB/mongoConnection");


const newsRoutes = require("./routes/newsRoute")
app.use("/news", newsRoutes);

connectToDB().then(() => {
  app.listen(port, () => console.log(`Server started on port ${port}`));
});
