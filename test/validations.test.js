const createCronjob = require('../index')
const scheduledJobs = require('../src/storage')
const logger = require('../config/logger')
const { expect } = require('./utils/chai')
const sinon = require('sinon')

describe('Test validations', async () => {
    beforeEach(() => {
        sinon.restore()
        sinon.stub(logger,'info')

        let count = 0
        const func = () => count ++
        const frequency = '5sec'
        const expectedRunDuration= '1sec'
        const jobID = '1'
        const loggerStub = sinon.stub(logger, 'error')
        const clock = sinon.useFakeTimers(new Date(2021, 0, 1, 0, 0, 0, 0));

        this.setup = {
            frequency,
            expectedRunDuration,
            jobID,
            func,
            loggerStub,
            clock
        }
    })
    afterEach(() => {
        sinon.restore()
        scheduledJobs.clear()
    })
    it('should fail to create a cronjob with a non-unique ID', async () => {
        const jobConfig = {
            frequency: this.setup.frequency,
            expectedRunDuration: this.setup.expectedRunDuration,
            func: this.setup.func,
            jobID: this.setup.jobID
        }
        // Create 2 cronjobs with same ID
        await createCronjob(jobConfig)
        await createCronjob(jobConfig)

        this.setup.clock.tick('10')
        expect(this.setup.loggerStub.firstCall.args[0]).to.be.equal(`Failed to create job with ID: ${jobConfig.jobID}. Reason: Duplicate job IDs`)
    })
    it('should fail to create a cronjob with an invalid jobID format', async () => {
        const invalidField = 2
        const jobConfig = {
            frequency: this.setup.frequency,
            expectedRunDuration: this.setup.expectedRunDuration,
            func: this.setup.func,
            jobID: invalidField 
        }
        await createCronjob(jobConfig)
        this.setup.clock.tick('10')
        expect(this.setup.loggerStub.firstCall.args[0]).to.be.equal(`Failed to create job with ID: ${jobConfig.jobID}. Invalid jobID - must be string`)
    })
    it('should fail to create a cronjob with an invalid frequency format', async () => {
        const invalidField = '2'
        const jobConfig = {
            frequency: invalidField,
            expectedRunDuration: this.setup.expectedRunDuration,
            func: this.setup.func,
            jobID: this.setup.jobID 
        }
        await createCronjob(jobConfig)
        this.setup.clock.tick('10')
        expect(this.setup.loggerStub.firstCall.args[0]).to.be.equal(`Failed to create job with ID: ${jobConfig.jobID}. Invalid frequency format`)
    })
    it('should fail to create a cronjob with an invalid function format', async () => {
        const invalidField = '2'
        const jobConfig = {
            frequency: this.setup.frequency,
            expectedRunDuration: this.setup.expectedRunDuration,
            func: invalidField,
            jobID: this.setup.jobID 
        }
        await createCronjob(jobConfig)
        this.setup.clock.tick('10')
        expect(this.setup.loggerStub.firstCall.args[0]).to.be.equal(`Failed to create job with ID: ${jobConfig.jobID}. Invalid func - must be in proper function syntax`)
    })
    it('should fail to create a cronjob with an invalid expectedRunDuration format', async () => {
        const invalidField = 2
        const jobConfig = {
            frequency: this.setup.frequency,
            expectedRunDuration: invalidField,
            func: this.setup.func,
            jobID: this.setup.jobID 
        }
        await createCronjob(jobConfig)
        this.setup.clock.tick('10')
        expect(this.setup.loggerStub.firstCall.args[0]).to.be.equal(`Failed to create job with ID: ${jobConfig.jobID}. Invalid expectedRunDuration - must be string`)
    })
    it('should fail to create a cronjob with a missing jobID', async () => {
        const jobConfig = {
            frequency: this.setup.frequency,
            expectedRunDuration: this.setup.expectedRunDuration,
            func: this.setup.func
        }
        await createCronjob(jobConfig)
        this.setup.clock.tick('10')
        expect(this.setup.loggerStub.firstCall.args[0]).to.be.equal(`Failed to create job with ID: ${jobConfig.jobID}. Missing argument 'jobID'`)
    })
    it('should fail to create a cronjob with a missing frequency', async () => {
        const jobConfig = {
            expectedRunDuration: this.setup.expectedRunDuration,
            func: this.setup.func,
            jobID: this.setup.jobID
        }
        await createCronjob(jobConfig)
        this.setup.clock.tick('10')
        expect(this.setup.loggerStub.firstCall.args[0]).to.be.equal(`Failed to create job with ID: ${jobConfig.jobID}. Missing argument 'frequency'`) 
    })
    it('should fail to create a cronjob with a missing func', async () => {
        const jobConfig = {
            frequency: this.setup.frequency,
            expectedRunDuration: this.setup.expectedRunDuration,
            jobID: this.setup.jobID
        }
        await createCronjob(jobConfig)
        this.setup.clock.tick('10')
        expect(this.setup.loggerStub.firstCall.args[0]).to.be.equal(`Failed to create job with ID: ${jobConfig.jobID}. Missing argument 'func'`)
  
    })
    it('should fail to create a cronjob with a missing expectedRunDuration', async () => {
        const jobConfig = {
            frequency: this.setup.frequency,
            func: this.setup.func,
            jobID: this.setup.jobID
        }
        await createCronjob(jobConfig)
        this.setup.clock.tick('10')
        expect(this.setup.loggerStub.firstCall.args[0]).to.be.equal(`Failed to create job with ID: ${jobConfig.jobID}. Missing argument 'expectedRunDuration'`)
  
    })
})