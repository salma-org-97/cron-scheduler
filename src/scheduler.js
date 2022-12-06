const EventEmitter = require('events')

/** Class representing a job scheduler.
 *  @extends EventEmitter
*/
class Scheduler extends EventEmitter {
    /**
     * Creates a job scheduler.
     * @param  {string} frequency The scheduling frequency
     */
    constructor(frequency) {
        super()
        this.frequency = frequency
    }

    /**
     * Runs the scheduler to start scheduling the cronjob.
     * @returns
     */
    run() {
        setInterval(() => {
            this.emit('time-to-execute')
        }, this.frequency)
    }
}

module.exports = Scheduler