import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

import { tickerStart, tickerSubscribe, tickerUnsubscribe } from './modules/ticker'

const app = express()
app.use(cors())
const server = http.createServer(app)

const corsWhitelist = [
    'http://localhost:8080', 
    'http://10.0.1.11:8080',
    'http://10.76.254.24:8080',
    'http://100.64.29.20:8080'
]

const io = new Server(server, {
    cors: {
        origin: function (origin, callback) {
            if (origin) {
                if (corsWhitelist.indexOf(origin) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            } else {
                callback(new Error('CORS cannot be undefined'))
            }
        },
        methods: ["GET", "POST"]
    }
})

tickerStart()


io.on('connection', (socket) => {
    console.log(`User connect ${socket.id}`)
    // socket.emit('tick', { message: 'testing 222'})


    socket.on('client', (data) => {
        console.log('Message received - topic: client - message:')
        console.log(data)
        console.log('emitting...')
        socket.emit('dada', {
            message: 'Server message'
        })
        console.log('emitted')
    })

    socket.on('ping', () => {
        // console.log('pinged')
        socket.emit('pong', {})
    })

    
    tickerSubscribe({ id: 'SocketIO', cb: (tickCount) => { 
        // console.log('ticking to clients')
        // socket.emit('tick', { message: tickCount })
        io.sockets.emit('tick', { message: tickCount })
    }})

})

server.listen(3000, () => {
    console.log('[SERVER] - Running at port 3000')
})
