
/**
 * Converts days to milliseconds
 * @param  {number} days The number of days
 * @returns {number} The corresponding number of milliseconds
 */
function _daysToMillisecs(days) {
    return days*24*60*60*1000
}

/**
 * Converts hours to milliseconds
 * @param  {number} hours The number of hours
 * @returns {number} The corresponding number of milliseconds
 */
function _hoursToMillisecs(hours) {
    return hours*60*60*1000
}

/**
 * Converts mins to milliseconds
 * @param  {number} mins The number of mins
 * @returns {number} The corresponding number of milliseconds
 */
function _minutesToMillisecs(mins) {
    return mins*60*1000
}

/**
 * Converts secs to milliseconds
 * @param  {number} secs The number of secs
 * @returns {number} The corresponding number of milliseconds
 */
function _secsToMillisecs(secs) {
    return secs*1000
}

/**
 * Extracts the number part from alphanumeric strings
 * @param  {string} numString The alphanumeric string
 * @param  {string} string The alphabetical part
 * @returns {number} The extracted number
 */
function _extractNumber(numString, string) {
    const index = numString.indexOf(string)
    return parseInt(numString.substring(0,index))
}

/**
 * Converts alphanumeric frequency to its corresponding number of milliseconds
 * @param  {string} frequency The alphanumeric frequency
 * @returns {number} The number of milliseconds
 */
function convertToMillisecs(frequency) {
    if(frequency.includes('day')) {
        const number = _extractNumber(frequency, 'day')
        return _daysToMillisecs(number)
    }
    if(frequency.includes('hr')) {
        const number = _extractNumber(frequency, 'hr')
        return _hoursToMillisecs(number)
    }
    if(frequency.includes('min')) {
        const number = _extractNumber(frequency, 'min')
        return _minutesToMillisecs(number)
    }
    if(frequency.includes('sec')) {
        const number = _extractNumber(frequency, 'sec')
        return _secsToMillisecs(number)
    }
}

module.exports = convertToMillisecs
