const createCronjob = require('./index')

function resolveAfter5Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
            console.log('Done!')
        }, 5000);
    });
}

async function delayedOperation() {
    await resolveAfter5Seconds();
}

function printHelloWorld() {
    console.log('Hello world!')
}

(function main() {

    createCronjob({
        frequency: '5sec',
        expectedRunDuration: '1sec',
        func: delayedOperation,
        jobID: '1'
    })
    createCronjob({
        frequency: '5sec',
        expectedRunDuration: '5sec',
        func: printHelloWorld,
        jobID: '2'
    })

})()


