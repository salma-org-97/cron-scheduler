const createCronjob = require('../index')
const scheduledJobs = require('../src/storage')
const logger = require('../config/logger')
const { expect } = require('./utils/chai')
const sinon = require('sinon')

describe('Test scheduling cronjob', () => {
    it('should successfully create & schedule a cronjob', async () => {
        sinon.stub(logger)
        const clock = sinon.useFakeTimers(new Date(2021, 0, 1, 0, 0, 0, 0));
        let count = 0
        let func = () => count ++
        expect(scheduledJobs.getLength()).to.be.equal(0)
        await createCronjob({
            frequency: '5sec',
            expectedRunDuration: '1sec',
            func,
            jobID: '1'
        })
        // Advance 20 seconds in time, where the cronjob should've been scheduled 5 times
        clock.tick('25')
        expect(count).to.be.equal(5)
        expect(scheduledJobs.getLength()).to.be.equal(1)
    })    
})