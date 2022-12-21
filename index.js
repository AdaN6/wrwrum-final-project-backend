const express = require ('express');
const app = express();
require("dotenv").config();

// const cors = require("cors");
// app.use(cors());


const port = process.env.PORT || 7000;



const newsRoutes = require("./routes/newsRoute")
app.use("/news", newsRoutes);


app.listen(port, () => console.log(`Server started on port ${port}`))