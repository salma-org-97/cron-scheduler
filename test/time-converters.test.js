const convertToMillisecs = require('../utils/time-converters')
const { expect } = require('./utils/chai')

describe('Test time converters', () => {
    it('should convert frequency in seconds to milliseconds', () => {
        const frequency = '1sec'
        const mSecs = convertToMillisecs(frequency)
        expect(mSecs).to.be.equal(1000)
    })
    it('should convert frequency in minutes to milliseconds', () => {
        const frequency = '1min'
        const mSecs = convertToMillisecs(frequency)
        expect(mSecs).to.be.equal(60000)
    })
    it('should convert frequency in hours to milliseconds', () => {
        const frequency = '1hr'
        const mSecs = convertToMillisecs(frequency)
        expect(mSecs).to.be.equal(3600000)
    })
    it('should convert frequency in days to milliseconds', () => {
        const frequency = '1day'
        const mSecs = convertToMillisecs(frequency)
        expect(mSecs).to.be.equal(86400000)
    })
})