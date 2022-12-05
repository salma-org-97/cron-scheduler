const logger = require('../config/logger')
const Scheduler = require('./scheduler')

class Job {
    constructor({ frequency, expectedRunDuration, func, jobID }) {
        this.frequency = frequency
        this.func = func
        this.id = jobID
        this.expectedRunDuration = expectedRunDuration
    }

    schedule() {
        this._scheduler = new Scheduler(this.frequency)
        this._scheduler.on('time-to-execute', () => {
            this.execute()
        })
        this._scheduler.run()
    }

    execute() {
        logger.info(`Starting execution of job ${this.id}`)
        const startTime = Date.now()
        this.func()
        const endTime = Date.now()
        const executionTime = endTime - startTime
        logger.info(`Expected run time: ${this.expectedRunDuration}. Actual run time: ${executionTime}`)
    }
}

module.exports = Job