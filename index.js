require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/usersRouter");

const middlewares = [
  express.urlencoded({ extended: false }),
  express.json(),
  cors(),
];
app.use(middlewares);

const port = process.env.PORT || 6000;

// --> connect to mongo
const connectToDB = require("./DB/mongoConnection");
connectToDB();

// routes
const newsRoutes = require("./routes/newsRoute");
app.use("/news", newsRoutes);
app.use("/api/user", userRoutes);


app.listen(port, () => console.log(`Server started on port ${port}`));
