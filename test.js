const { createCronjob }  = require('./index')

const printHelloWorld = () => {
    console.log('hello world')
}

const printByeWorld = () => {
    console.log('bye world')
}

createCronjob({
    frequency: 5000,
    expectedRunDuration: 2,
    func: printHelloWorld,
    jobID: 1
})
createCronjob({
    frequency: 5000,
    expectedRunDuration: 20,
    func: printByeWorld,
    jobID: 2
})

