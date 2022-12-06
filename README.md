# cron-scheduler

## Description
The cron-scheduler module is a simplified version of an in-process cronjob scheduler that accepts a job & executes it periodically.

## Reasoning behind technical decisions
 - Node.js is based on the event-driven architecture, which responds to emitted events by running their callbacks 
in the event loop. It also supports non-blocking IO operations, meaning that any heavy-duty tasks are offloaded to system kernel to avoid blocking its single thread. As a result, these features made Nodejs convenient to implement a cron-scheduler. 

- The `EventEmitter` class was used to emit an event for each job at its scheduled time & each job's event listener executes the 
job implementation on receiving this event.

- The `setInterval` function is what each job scheduler uses to fire events according to the job's scheduling frequency.

- Concurrency is achieved through this design due to Node.js's asynchronous non-blocking event-driven nature, which is able to respond 
to events & execute multiple operations in the background.

## Trade-offs made
There is a limitation on the delay argument used by the `setInterval`, as it is a signed 32-bit integer. This effectively limits its value to a maximum of 2147483647 ms, which corresponds to almost 24 days. So this scheduler has a maximum capacity of scheduling a job every 24 days.

The trade-off made here is the simplicity & convenience of using the `setInterval` function VS the limitation on its max delay.

Another limitation that this solution has, is that we cannot specify the number of concurrent tasks.

## Usage

Import cron-scheduler & create a cronjob to be scheduled.

### Example 1
Create a cronjob to be executed every 2 minutes, that is expected to run for 1 second.

```javascript

const createCronJob = require('cron-scheduler')

const sayHelloWorld = () => {
    console.log('hello world')
}

createCronJob({
    frequency: '2min',
    expectedRunDuration: '1sec',
    func: sayHelloWorld,
    jobID: '1'
})

```
The scheduling frequency represents how frequent we want to run our cronjob. For example, `1hr` means we should run the cronjob every hour.

### Supported Formats for the Scheduling Frequency:
- `(1-59)sec`
- `(1-59)min`
- `(1-23)hr`
- `(1-24)day`

## How to run tests:

	$ npm test

## Possible future improvements
1. External persistence such as a database can be used to store the created cronjobs in case the process exits.
2. The library can be enhanced to support real cron-expressions such as `* * * * *`.
3. A queue, such as SQS, can be used to save the jobs, & a worker can be used to process these jobs concurrently, where we can specify the number of concurrent tasks that the worker can consume & execute.
