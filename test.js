const createCronjob = require('./index')

const dummyFunc = () => {
    let x = 0
    for (let i = 0; i++; i < 100000) {
        x = i
    }
}

const printHelloWorld = () => {
    console.log('hello world')
}

(function main() {

    createCronjob({
        frequency: '5sec',
        expectedRunDuration: '1sec',
        func: dummyFunc,
        jobID: '1'
    })
    createCronjob({
        frequency: '10sec',
        expectedRunDuration: '5sec',
        func: printHelloWorld,
        jobID: '2'
    })

})()


