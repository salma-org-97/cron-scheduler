const scheduledJobs = require('../src/storage')
const { expect } = require('chai')

describe('Test saving job', () => {
    it ('should successfully save a job & add it to the map', () => {
        const job = {}
        const jobID = 'testID'
        expect(scheduledJobs.getLength()).to.be.equal(0)
        scheduledJobs.save(jobID, job)
        expect(scheduledJobs.getLength()).to.be.equal(1)
    })
})