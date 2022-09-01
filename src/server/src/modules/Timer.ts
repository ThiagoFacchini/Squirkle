import Settings from '../settings/settings'
import { COMMANDLINE_RESPONSES, COMMANDLINE_COMMANDS, SENDER } from '../definitions/enums'

console.log('[MODULE:TIMER]: Loaded.')

let hours, minutes, friendlyHours, friendlyMinutes, setTimeCb


const dayTicks = 720
const nightTicks = 1440
const dawnTicks = 360
const duskTicks = 1080


const setTime = (cb: any) => {
    console.log(`[MODULE:TIMER] - setTime function set.`)    
    setTimeCb = cb
}


const processTick = (tickCount: number) => {
    hours = Math.floor(tickCount / 60)
    minutes = tickCount % 60

    friendlyHours = hours < 10 ? `0${hours}` : hours
    friendlyMinutes = minutes < 10 ? `0${minutes}` : minutes

    // console.log(`[MODULE:TIMER] - Time is ${friendlyHours}:${friendlyMinutes}.`)
}

const commands = (commandArgs: string) => {
    const decodedCommand = commandArgs.split(" ")
    const command = decodedCommand[0].toLowerCase()
    console.log(`command is ${command}`)
    if (command === 'set') {
        switch (decodedCommand[1].toLowerCase()) {
            case 'day':
                setTimeCb(dayTicks)
                console.log('[MODULE:TIMER]: Time set to day.')
                return { 
                    status: COMMANDLINE_RESPONSES.OK,
                    message: 'Time set to day.',
                    sender: SENDER.SERVER
                }

            case 'night':
                setTimeCb(nightTicks)
                console.log('[MODULE:TIMER]: Time set to night.')
                return { 
                    status: COMMANDLINE_RESPONSES.OK, 
                    message: 'Time set to night.',
                    sender: SENDER.SERVER
                }
            
            case 'dawn':
                setTimeCb(dawnTicks)
                console.log('[MODULE:TIMER]: Time set to dawn.')
                return { 
                    status: COMMANDLINE_RESPONSES.OK,
                    message: 'Time set to dawn.',
                    sender: SENDER.SERVER
                }
            
            case 'dusk':
                setTimeCb(duskTicks)
                console.log('[MODULE:TIMER]: Time set to dusk.')
                return { 
                    status: COMMANDLINE_RESPONSES.OK,
                    message: 'Time set to dusk.',
                    sender: SENDER.SERVER
                }

            default:
                return { 
                    status: 'ERROR',
                    message: `Command ${decodedCommand[1]} not recognised.`,
                    sender: SENDER.SERVER
                }
        }

    } else if (command.toLowerCase() === 'get') {
        return { 
            status: COMMANDLINE_RESPONSES.OK,
            message: `It is ${friendlyHours}:${friendlyMinutes}.`,
            sender: SENDER.SERVER
        }

    } else if (command.toLowerCase() === COMMANDLINE_COMMANDS.HELP) {
        return {
            status: COMMANDLINE_RESPONSES.OK,
            message: `----- get | set`,
            sender: SENDER.SERVER
        }

    } else {
        return { 
            status: COMMANDLINE_RESPONSES.ERROR,
            message: `Command ${decodedCommand[0]} not recognised.`,
            sender: SENDER.SERVER
        }
    }
}


const Timer = {
    processTick: processTick,
    commands: commands,
    setTime: setTime
}


export default Timer