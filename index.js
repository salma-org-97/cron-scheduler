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
        // validate arguments
        const errMsg = _validateArgs({ frequency, expectedRunDuration, func, jobID })
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

function _validateArgs({ frequency, expectedRunDuration, func, jobID }) {
    const failMsg = `Failed to create job with ID: ${jobID}.`
    let errMsg = ''
    if (!frequency) errMsg = `${failMsg} Missing argument 'frequency'`
    else if (!expectedRunDuration) errMsg = `${failMsg} Missing argument 'expectedRunDuration'`
    else if (!func) errMsg = `${failMsg} Missing argument 'func'`
    else if (!jobID) errMsg = `${failMsg} Missing argument 'jobID'`
    else if (!_.isString(jobID)) errMsg = `${failMsg} Invalid jobID - must be string`
    else if (scheduledJobs.map.has(jobID)) errMsg = `${failMsg} Reason: Duplicate job IDs`
    else if (!_.isFunction(func)) errMsg = `${failMsg} Invalid func - must be in proper function syntax`
    else if (!_.isString(frequency)) errMsg = `${failMsg} Invalid frequency - must be string`
    else if (!_validateFrequency(frequency)) errMsg = `${failMsg} Invalid frequency format`
    else if (!_.isString(expectedRunDuration)) errMsg = `${failMsg} Invalid expectedRunDuration - must be string`
    else if (!_validateExpectedRunDuration(expectedRunDuration)) errMsg = `${failMsg} Invalid expectedRunDuration format`
    return errMsg
}

/**
 * Validates the frequency expression.
 * @param  {string} frequency The scheduling frequency
 * @returns {boolean} Whether the frequency format is valid or not
 */
function _validateFrequency(frequency) {
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
