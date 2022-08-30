import { isEmpty } from 'lodash'
import { COMMANDS_RESPONSES, SENDER } from '../definitions/enums'

type ModulesType = {
    key: string,
    commands: Array<string>
    cb: (command: string) => void,
}

type ResponseType = {
    status: string,
    message: string,
    sender: string
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
    let isInvalid = true
    let decodedCommand = commandline.split(" ")
    const command = decodedCommand[0].toLowerCase()

    decodedCommand.splice(0, 1)
    let commandArgs = decodedCommand.join(' ')

    if (command === '/help') {
        isInvalid = false

        for (let i = 0; i < modules.length; i++) {
            let message = `${modules[i].key} commands:`

            const response = modules[i].cb('help')
            commandsCallback(response, socketId)

            for (let x = 0; x < modules[i].commands.length; x++) {
                let message = `-- ${modules[i].commands[x]}`

                commandsCallback({
                    status: COMMANDS_RESPONSES.OK,
                    message: message,
                    sender: SENDER.SERVER
                }, socketId)
            }

            commandsCallback({
                status: COMMANDS_RESPONSES.OK,
                message: message,
                sender: SENDER.SERVER
            }, socketId)

        }

        return

    } else {
        for (let i = 0; i < modules.length; i++) {
            for (let x = 0; x < modules[i].commands.length; x++) {
                if (modules[i].commands[x] === command) {
                    isInvalid = false
                    const response = modules[i].cb(commandArgs)
                    commandsCallback(response, socketId)
                }
            }
        }
    }

    if (isInvalid) {
        commandsCallback({
            status: COMMANDS_RESPONSES.ERROR,
            message: `${command} is not a valid command.`,
            sender: SENDER.SERVER
        }, socketId)
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
        return
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