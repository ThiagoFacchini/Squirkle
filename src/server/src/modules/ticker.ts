const subscribers = []
const interval = 1000

let count: number = 0
const shouldTick: boolean = true

setInterval(() => {
    console.log(`ticking => ${count}`)
    count++

    if (count > 10) {
        clearInterval(this)
        console.log('ticker stopped')
    }
}, interval)


export function tick() {
    console.log('ticked')
}

export function subscribe() {}

export function unsubscribe() {}

