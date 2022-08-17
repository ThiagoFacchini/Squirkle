import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

import { tickerStart, tickerSubscribe, tickerUnsubscribe } from './modules/ticker'

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
})

tickerStart()


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

    
    tickerSubscribe({ id: 'SocketIO', cb: (tickCount) => { 
        console.log('ticking to clients')
        socket.emit('tick', { message: tickCount })
    }})

})

server.listen(3000, () => {
    console.log('[SERVER] - Running at port 3000')
})
