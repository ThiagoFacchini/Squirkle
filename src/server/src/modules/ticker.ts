import { isEmpty } from 'lodash'

type SubscriptionType = {
    id: string
    cb: (tick: number) => void
} 

console.log('[MODULE:TICKER]: Loaded.')

// Configurations
const dayTickAmount = 1440
const intervalMS = 1000

let ticker
let tickCount: number = 0
const subscribersArr: Array<SubscriptionType> = []


function tick() {
    (tickCount === dayTickAmount) ? tickCount = 0 : tickCount++

    if (!isEmpty(subscribersArr)) {
        for (let i =0; i < subscribersArr.length; i++) {
            subscribersArr[i].cb(tickCount)
        }
    }
}

function subscribe(subscriber: SubscriptionType) {
    console.log(`Subscribing client id: ${subscriber.id}`)
    subscribersArr.push(subscriber)
}

export function tickerSubscribe(subscriber: SubscriptionType) {
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

export function tickerUnsubscribe() {}

export function tickerStart() {
    console.log('[MODULE:TICKER]: Started.')
    ticker = setInterval(tick, intervalMS)
}

export function tickerStop() {
    console.log('[MODULE:TICKER]: Stopped.')
    clearInterval(ticker)
}

