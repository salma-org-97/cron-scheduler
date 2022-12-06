const Job = require('./src/job')
const scheduledJobs = require('./src/storage')
const convertToMillisecs = require('./utils/time-converters')
const logger = require('./config/logger')
const _ = require('lodash')

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
        // validations
        if(scheduledJobs.has(jobID)) throw Error('Job creation failed. Reason: Duplicate job IDs')
        if(!_.isString(jobID)) throw Error('Invalid jobID - must be string')
        if(!_.isFunction(func)) throw Error('Invalid func - must be in proper function syntax')
        if(!_.isString(frequency)) throw Error('Invalid frequency - must be string')
        if(!_validateFrequency(frequency)) throw Error('Invalid frequency format')
        if(!_.isString(expectedRunDuration)) throw Error('Invalid expectedRunDuration - must be string')
        if(!_validateExpectedRunDuration(expectedRunDuration)) throw Error('Invalid expectedRunDuration format')

        const freqMsecs = convertToMillisecs(frequency)
        const job = new Job({ frequency: freqMsecs, expectedRunDuration, func, jobID })
        await job.schedule()
        scheduledJobs.set(jobID, job)
        logger.info(`Successfully created cronjob with ID ${jobID}`)
    } catch (err) {
        logger.error(err.message)
    }
}

/**
 * Validates the frequency expression.
 * @param  {string} frequency The scheduling frequency
 * @returns {boolean} Whether the frequency format is valid or not
 */
function _validateFrequency (frequency) {
    return (frequency.includes('day') || frequency.includes('hr') || frequency.includes('min') || frequency.includes('sec'))
    // TODO: add more validations
}

/**
 * Validates the expectedRunDuration expression.
 * @param  {string} expectedRunDuration The expected duration of a single job run
 * @returns {boolean} Whether the expectedRunDuration format is valid or not
 */
function _validateExpectedRunDuration(expectedRunDuration) {
    return (expectedRunDuration.includes('hr') || expectedRunDuration.includes('min') || expectedRunDuration.includes('sec'))
}

module.exports = createCronjob
