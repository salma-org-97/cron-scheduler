const logger = require('./config/logger')
const Job = require('./src/job')

const scheduledJobs = new Map()

function createCronjob({ frequency, expectedRunDuration, func, jobID }) {
    try {
        if (!_validateJob(jobID)) throw Error('Job creation failed. Reason: Duplicate job IDs')

        const job = new Job({ frequency, expectedRunDuration, func, jobID })
        job.schedule()
        scheduledJobs.set(jobID, job)
        
        logger.info(`Successfully created cronjob with ID ${jobID}`)
    } catch (err) {
        logger.error(err.message)
    }
}

function _validateJob(jobID) {
    return !scheduledJobs.has(jobID)
}

module.exports = {
    createCronjob
}
