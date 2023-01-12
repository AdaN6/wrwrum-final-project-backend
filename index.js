require("dotenv").config();
const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 7000;
const newsRoutes = require("./routes/newsRoute")

app.use(cors());
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});
app.use("/news", newsRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on("connection", (socket) => {
  console.log("c", socket.id)
  const data = ''
  socket.on('send', (message) => {
    alert('Something came along on the "message" channel:', message);
});
});

	io.on('send', (socket) => {
		socket.on('hello', (message) => {
			console.log(message); // world
		});
	});


io.on('disconnect', (socket) => {
  console.log('user disconnected', socket.id)
})
httpServer.listen(7000, () => {
  console.log('listening on *:7000');
});