class ScheduledJobsMap {

    constructor() {
        this.map = new Map()
    }

    save(jobID, job) {
        this.map.set(jobID, job)
    }

    getLength() {
        return this.map.size
    }
}

let scheduledJobs = Object.freeze(new ScheduledJobsMap)

module.exports = scheduledJobs

