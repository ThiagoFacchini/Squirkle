import { isEmpty } from 'lodash'
import { Socket } from 'socket.io'

type ModulesType = {
    key: string,
    commands: Array<string>
    cb: (command: string) => void,
}

type ResponseType = {
    status: string,
    message: string
}

const modules: Array<ModulesType> = []
let commandsCallback


const register = (cb, key, commands) => {
    modules.push({ cb: cb, key: key, commands: commands })
    console.log(`[MODULE:COMMANDS]: Module ${key} successfully registered.`)
}


const unregister = (i: number) => {
    console.log(`[MODULE:COMMANDS]: Module ${modules[i].key} successfully unregistered`)
    modules.splice(i,1)
}


const processCommand = (commandline: string, socketId: string) => {
    let decodedCommand = commandline.split(" ")
    const command = decodedCommand[0]

    decodedCommand.splice(0, 1)
    let commandArgs = decodedCommand.join(' ')

    for (let i = 0; i < modules.length; i++) {
        for (let x = 0; x < modules[i].commands.length; x++) {
            if (modules[i].commands[x] === command) {
                const response = modules[i].cb(commandArgs)
                commandsCallback(response, socketId)
            }
        }
    }
}


const registerModule = (cb, key, commands) => {
    if (!isEmpty(modules)) {
        let shouldRegister = true

        for (let i = 0; i < modules.length; i++) {
            if (modules[i].key === key) {
                shouldRegister = false
                return
            }
        }

        if (shouldRegister) register(cb, key, commands)
    } 
    register(cb, key, commands)
}


const unregisterModule = (key: string) => {
    for (let i = 0; i < modules.length; i++) {
        if (modules[i].key == key) {
            unregister(i)
        }
        return
    }
}

const registerCommandResponse = (cb) => {
    commandsCallback = cb
    console.log(`[MODULE:COMMANDS]: Command response successfully registed.`)
}


const CommandLine = {
    register: registerModule,
    unregister: unregisterModule,
    process: processCommand,
    registerCommandResponse: registerCommandResponse
}

export default CommandLine