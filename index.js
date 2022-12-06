const Job = require('./src/job')
const scheduledJobs = require('./src/storage')
const convertToMillisecs = require('./utils/time-converters')
const { validateArgs } = require('./src/validator')
const logger = require('./config/logger')

/**
 * Creates a cronjob to be executed frequently according to the scheduling frequency.
 * @async
 * @param  {string} frequency The scheduling frequency
 * @param  {string} expectedRunDuration The expected duration of a single job run
 * @param {Function} func The function to be executed
 * @param {string} jobID The ID of the cronjob
 * @returns
 */
async function createCronjob({ frequency, expectedRunDuration, func, jobID }) {
    try {
        // validate arguments
        const errMsg = validateArgs({ frequency, expectedRunDuration, func, jobID })
        if (errMsg) throw Error(errMsg)

        // format frequency
        const freqMsecs = convertToMillisecs(frequency)

        // schedule & save job
        const job = new Job({ frequency: freqMsecs, expectedRunDuration, func, jobID })
        await job.schedule()
        scheduledJobs.save(jobID, job)
        logger.info(`Successfully created cronjob with ID ${jobID}`)
    } catch(err) {
        logger.error(err.message)
    }
}

module.exports = createCronjob
