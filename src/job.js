const Scheduler = require('./scheduler')
const logger = require('../config/logger')

/** Class representing a job. */
class Job {
    /**
     * Creates a job.
     * @param  {string} frequency The scheduling frequency
     * @param  {string} expectedRunDuration The expected duration of a single job run
     * @param  {Function} func The function to be executed
     * @param  {string} jobID The ID of the cronjob
     */
    constructor({ frequency, expectedRunDuration, func, jobID }) {
        this.frequency = frequency
        this.func = func
        this.id = jobID
        this.expectedRunDuration = expectedRunDuration
    }

    /**
     * Schedules a job according to its scheduling frequency.
     * @async
     * @returns
     */
    async schedule() {
        this._scheduler = new Scheduler(this.frequency)
        this._scheduler.on('time-to-execute', async () => {
            await this.execute()
        })
        this._scheduler.run()
    }

     /**
     * Executes the function associated with the job.
     * @async
     * @returns
     */
    async execute() {
        logger.info(`Starting execution of job ${this.id}`)
        const startTimeInMillisecs = Date.now()
        await this.func()
        const endTimeInMillisecs = Date.now()
        const executionTime = (endTimeInMillisecs - startTimeInMillisecs) / 1000 + 'sec'
        logger.info(`Finished execution of job ${this.id}. Expected run duration: ${this.expectedRunDuration}. Actual run duration: ${executionTime}`)
    }
}

module.exports = Job