import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

import Settings from './settings/settings'

import Ticker from './modules/ticker'
import CommandLine from './modules/commands'
import Timer from './modules/Timer'


// Server initialization
const app = express()
app.use(cors())
const server = http.createServer(app)

const corsWhitelist = [
    'http://localhost:8080', 
    'http://10.0.1.11:8080',
    'http://10.76.254.24:8080',
    'http://100.64.29.20:8080'
]


// Modules initialization
Ticker.start()

// Subscribing the Timer system to ticker
Ticker.subscribe({ id: 'Time', cb: Timer.processTick })

// Linking Ticker to the Timer system
Timer.setTime(Ticker.set)

// Registering Commands
CommandLine.registerCommandResponse((response, socketId) => {
    io.to(socketId).emit('commandLine', response)
})

CommandLine.register(Timer.commands, 'Timer', ['/time'])
CommandLine.register(Ticker.commands, 'Ticker', ['/tick'])



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


io.on('connection', (socket) => {
    console.log(`[SERVER]: User connect ${socket.id}`)

    socket.emit('serverConfigs', {
        socket: {
            tickInterval: Settings.socket.tickInterval
        }
    })

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
        socket.emit('pong', {})
    })


    socket.on('commandLine', (data) => {
        CommandLine.process(data, socket.id)
    })

    
    Ticker.subscribe({ id: 'SocketIO', cb: (tickCount) => { 
        io.sockets.emit('tick', { message: tickCount })
    }})

})


server.listen(3000, () => {
    console.log('[SERVER] - Running at port 3000')
})


