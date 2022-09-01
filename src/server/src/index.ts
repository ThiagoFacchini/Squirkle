import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

import Settings from './settings/settings'

import Ticker from './modules/ticker'
import CommandLine from './modules/commands'
import Timer from './modules/Timer'
import Authenticator from './modules/authenticator'

import { SOCKET_EVENTS, AUTHENTICATOR_RERSPONSES } from './definitions/enums'


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


io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    console.log(`[SERVER]: User connected. Socket id: ${socket.id}`)

    /** Authenticate the client */
    socket.on(SOCKET_EVENTS.AUTHENTICATE, (data) => {
        console.log('hit')
        const response = Authenticator.authenticate(data.username, data.password)
        socket.emit(SOCKET_EVENTS.AUTHENTICATE, response)
    })


    /** Emits to the client server configurations */
    socket.on(SOCKET_EVENTS.SERVER_CONFIGS, (data) => {
        socket.emit(SOCKET_EVENTS.SERVER_CONFIGS, {
            camera: {
                cameraOffsetY: Settings.camera.offsetY,
                cameraOffsetZ: Settings.camera.offsetZ
            },
            socket: {
                tickInterval: Settings.socket.tickInterval,
            },
            player: {
                walkSpeed: Settings.player.walkSpeed,
                runSpeed: Settings.player.runSpeed,
                rotateSpeed: Settings.player.rotateSpeed
            }
        })
    })


    /** Process commands */
    socket.on(SOCKET_EVENTS.COMMANDLINE, (data) => {
        CommandLine.process(data, socket.id)
    })




    /** Subscribing for the ticker service */
    Ticker.subscribe({ id: 'SocketIO', cb: (tickCount) => { 
        io.sockets.emit('tick', { message: tickCount })
    }})

})


server.listen(3000, () => {
    console.log('[SERVER] - Running at port 3000')
})


