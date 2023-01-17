require("dotenv").config();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 6000;

//connect to mongo
const connectToDB = require("./DB/mongoConnection");
connectToDB();
const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require("socket.io");

const newsRoutes = require("./routes/newsRoute")

app.use((req,res,next)=>{
  console.log(req.path,req.method)
  next()
})
app.use(cors());
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
});
app.use("/news", newsRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on("connection", (socket) => {
  console.log("c", socket.id)
  socket.on('send', (message, userName, timestamp, colorMe, colorOther) => {
    // socket.emit('message', message)
    socket.broadcast.emit('receive_message', {message, userName, timestamp, colorMe, colorOther})
    // console.log(message, socket.id)
  });

  // socket.on('join_room', (data) => {
  //   socket.join(data)
  //   console.log(`user with id ${socket.id} joined room: ${data}`)
  // })
  
  
  io.on('disconnect', (socket) => {
    console.log('user disconnected', socket.id)
  })

	// io.on('send', (socket) => {
	// 	socket.on('hello', (message) => {
	// 		// alert(message);
	// 	});
	// });
});

httpServer.listen(7000, () => {
  console.log(`listening on port ${port}`);
});