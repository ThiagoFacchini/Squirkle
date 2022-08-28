import Settings from '../settings/settings'
import { COMMANDS_RESPONSES } from '../definitions/responses'

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

    if (decodedCommand[0] === 'set') {
        switch (decodedCommand[1]) {
            case 'day':
                setTimeCb(dayTicks)
                console.log('[MODULE:TIMER]: Time set to day.')
                return { status: COMMANDS_RESPONSES.OK, message: 'Time set to day.'}

            case 'night':
                setTimeCb(nightTicks)
                console.log('[MODULE:TIMER]: Time set to night.')
                return { status: COMMANDS_RESPONSES.OK, message: 'Time set to night.'}
            
            case 'dawn':
                setTimeCb(dawnTicks)
                console.log('[MODULE:TIMER]: Time set to dawn.')
                return { status: COMMANDS_RESPONSES.OK, message: 'Time set to dawn.'}
            
            case 'dusk':
                setTimeCb(duskTicks)
                console.log('[MODULE:TIMER]: Time set to dusk.')
                return { status: COMMANDS_RESPONSES.OK, message: 'Time set to dusk.'}

            default:
                return { status: 'ERROR', message: `command ${decodedCommand[1]} not recognised.`}
        }

    } else if (decodedCommand[0] === 'get') {
        return { status: COMMANDS_RESPONSES.OK, message: `It is ${friendlyHours}:${friendlyMinutes}.`}

    } else {
        return { status: COMMANDS_RESPONSES.ERROR, nmessage: `command ${decodedCommand[0]} not recognised.`}
    }
}


const Timer = {
    processTick: processTick,
    commands: commands,
    setTime: setTime
}


export default Timer