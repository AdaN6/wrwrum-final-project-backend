require("dotenv").config();
const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 7000;

const middlewares = [
  express.urlencoded({ extended: false }),
  express.json(),
  cors(),
];
app.use(middlewares);

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  
  next();
});


const connectToDB = require("./DB/mongoConnection");
connectToDB();

const newsRoutes = require("./routes/newsRoute");
const userRoutes = require("./routes/usersRouter");
app.use("/news", newsRoutes);
app.use("/api/user", userRoutes);

app.use((req,res,next)=>{
  console.log(req.path,req.method)
  next()
})
app.use(cors());
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND
  }
});
app.use("/news", newsRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on("connection", (socket) => {
  console.log("c", socket.id)
  socket.on('send', (message, userName, timestamp, colorMe, colorOther) => {
    socket.broadcast.emit('receive_message', {message, userName, timestamp, colorMe, colorOther})
  });
  
  
  io.on('disconnect', (socket) => {
    console.log('user disconnected', socket.id)
  })
});

httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// app.listen(port, () => console.log(`Server started on port ${port}`));
