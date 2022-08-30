import { isEmpty } from 'lodash'
import Settings from './../settings/settings'
import { COMMANDS_RESPONSES, SENDER } from '../definitions/enums'

type SubscriptionType = {
    id: string
    cb: (tick: number) => void
} 

console.log('[MODULE:TICKER]: Loaded.')

// Configurations
const resetAtTick = Settings.calendar.dayTickAmount
const intervalMS = Settings.socket.tickInterval


let ticker
let tickCount: number = 0
const subscribersArr: Array<SubscriptionType> = []


const tick = () => {
    (tickCount === resetAtTick) ? tickCount = 0 : tickCount++

    if (!isEmpty(subscribersArr)) {
        for (let i =0; i < subscribersArr.length; i++) {
            subscribersArr[i].cb(tickCount)
        }
    }
}


const subscribe = (subscriber: SubscriptionType) => {
    console.log(`[MODULE:TICKER]: Module ${subscriber.id} successfully subscribed.`)
    subscribersArr.push(subscriber)
}


const unsubscribe = (index: number) => {
    console.log(`[MODULE:TICKER]: Module ${subscribersArr[index].id} successfully unsubscribed.`)
    subscribersArr.splice(index,1)
}


const tickerSubscribe = (subscriber: SubscriptionType) => {
    if (!isEmpty(subscribersArr)) {
        let shouldSubscribe = true

        for (let i = 0; i < subscribersArr.length; i++) {
            if (subscribersArr[i].id === subscriber.id) {
                shouldSubscribe = false
                return
            }
        }

        if (shouldSubscribe) subscribe(subscriber)
        return
    } 

    subscribe(subscriber)
}


const tickerUnsubscribe = (id) => {
    for (let i = 0; i < subscribersArr.length; i++) {
        if (subscribersArr[i].id == id) {
            unsubscribe(i)
        }
        return
    }    
}


const tickerStart = () => {
    console.log('[MODULE:TICKER]: Started.')
    ticker = setInterval(tick, intervalMS)
}


const tickerStop = () => {
    console.log('[MODULE:TICKER]: Stopped.')
    clearInterval(ticker)
}


const tickerSet = (newTickCount: number) => {
    tickCount = newTickCount
    console.log(`[MODULE:TICKER]: Ticker count set to ${newTickCount}.`)
}


const commands = (commandArgs: string) => {
    const decodedCommand = commandArgs.split(" ")
    const command = decodedCommand[0].toLowerCase()

    if (command === 'set') {
        const newTickCount = parseInt(decodedCommand[1])
        tickCount = newTickCount
        return { 
            status: COMMANDS_RESPONSES.OK,
            message: `TickCount set to ${newTickCount}`,
            sender: SENDER.SERVER
        }

    } else if (command === 'stop') {
        tickerStop()
        return { 
            status: COMMANDS_RESPONSES.OK,
            message: `Ticker stopped.`,
            sender: SENDER.SERVER
        }

    } else if (command === 'start') {
        tickerStart()
        return { 
            status: COMMANDS_RESPONSES.OK,
            message: `Ticker started.`,
            sender: SENDER.SERVER
        }

    } else if (command.toLowerCase() === 'help') {
        return {
            status: COMMANDS_RESPONSES.OK,
            message: `----- set | stop | start`,
            sender: SENDER.SERVER
        }

    } else {
        return { 
            status: COMMANDS_RESPONSES.ERROR,
            message: `command ${decodedCommand[0]} not recognised.`,
            sender: SENDER.SERVER
        }
    }
}


const Ticker = {
    subscribe: tickerSubscribe,
    unsubscribe: tickerUnsubscribe,
    start: tickerStart,
    stop: tickerStop,
    set: tickerSet,
    commands: commands
}

export default Ticker 
