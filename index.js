const Job = require('./src/job')

const createCronjob = ({ frequency, expectedRunDuration, func, jobID }) => {
    const job = new Job({ frequency, expectedRunDuration, func, jobID })
    job.schedule()
}

module.exports = {
    createCronjob
}
