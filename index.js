const app = require('express')()
const http = require("http")
const server = http.createServer(app);
const {Server} = require("socket.io")
const io = new Server(server)

const PORT = process.env.PORT || 3700;

app.get('/', (req, res) => {
    res.send("Node Server is running on PORT: "+PORT)
})
console.log("Dolazi do socketa")
io.on("connection", (socket) => {
    console.log("Connected")
     socket.io("position-change", (data) => {
        console.log("Opalac: "+data)
         io.emit("position-change", data);
     });

     socket.on("disconnect", () => {
        console.log("Disconnected")
     });
 }); 

 server.listen(PORT, () => {
     console.log(`listening on ${PORT}`);
 })