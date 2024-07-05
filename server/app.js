const express = require("express")
const {createServer} = require("http")
const {Server} = require("socket.io")
const app = express()
const cors = require("cors")
const server = createServer(app)
const io = new Server(server , {
    cors:{
        origin:"http://localhost:5173",
        credentials:true,
    }
})
io.on("connection" , (socket)=>{
    console.log(socket.id , "connected")
    socket.on("send-location" , (data)=>{
        console.log(data)
        const id = socket.id
        socket.emit("receive-location" , {data , id })
    })
    socket.on("disconnect" , ()=>{
        console.log("diconnected");
    })
})
server.listen(3000 , ()=>{
    console.log("listening to 3000");
})  