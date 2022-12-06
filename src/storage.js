/** Class representing the scheduled jobs. */
class ScheduledJobsMap {
     /**
     * Creates a map to store the scheduled jobs.
     */
    constructor() {
        this.map = new Map()
    }

    /**
     * Adds a job to the map of scheduled jobs with its jobID as the key.
     * @param  {string} jobID The job ID
     * @param  {Object} job The job object
     * @returns
     */
    save(jobID, job) {
        this.map.set(jobID, job)
    }

    /**
     * Gets the number of jobs in the map.
     * @returns
     */
    getLength() {
        return this.map.size
    }
}

let scheduledJobs = Object.freeze(new ScheduledJobsMap)

module.exports = scheduledJobs

