const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log(`User connect ${socket.id}`)

    socket.on('client', (data) => {
        console.log('Message received - topic: client - message:')
        console.log(data)
        console.log('emitting...')
        socket.emit('dada', {
            message: 'Server message'
        })
        console.log('emitted')
    })

})

server.listen(3000, () => {
    console.log('[SERVER] - Running at port 3000')
})
