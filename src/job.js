const Scheduler = require('./scheduler')

class Job {
    constructor({ frequency, expectedRunDuration, func, jobID }) {
        this.frequency = frequency
        this.func = func
    }

    schedule() {
        this._scheduler = new Scheduler(this.frequency)
        this._scheduler.on('time-to-execute', () => { 
            this.func()
        })
        this._scheduler.run()
    }
}

module.exports = Job