require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const middlewares = [
    express.urlencoded({extended:false}),
    express.json(), 
    cors()];
app.use(middlewares);

const port = process.env.PORT || 6000;

// --> connect to mongo
const connectToDB = require("./DB/mongoConnection");

const newsRoutes = require("./routes/newsRoute");
app.use("/news", newsRoutes);

connectToDB().then(() => {
  app.listen(port, () => console.log(`Server started on port ${port}`));
});
