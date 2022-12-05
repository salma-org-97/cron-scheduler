const EventEmitter = require('events')

class Scheduler extends EventEmitter {
    constructor(frequency) {
        super()
        this.frequency = frequency
    }

    run() {
        setInterval(() => {
            this.emit('time-to-execute')
        }, this.frequency)
    }
}

module.exports = Scheduler